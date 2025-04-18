import createError from "http-errors";
import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Provider as lti } from "ltijs";
import Database from "ltijs-sequelize";
import logger from "./lib/logger.js";
import apiRouter from "./routes/api.js";
import config from "./config.js";

// eslint-disable-next-line new-cap
const router = express.Router();

const db = new Database(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  dialect: "postgres",
  logging: false,
});

lti.setup(
  config.lti.key,
  {
    plugin: db,
  },
  {
    staticPath: "dist",
    cookies: {
      secure: true,
      sameSite: "None",
    },
    tokenMaxAge: false,
    devMode: false,
  }
);

// When receiving successful LTI launch redirects to app
lti.onConnect(async (token, req, res) => {
  return res.sendFile("index.html", { root: "dist" });
});

// When receiving deep linking request redirects to deep screen
lti.onDeepLinking(async (token, req, res) => {
  return lti.redirect(res, "/deeplink", { newResource: true });
});

// Setup function
const setup = async () => {
  await lti.deploy({ port: process.env.PORT || "3000" });

  /**
   * Register platform
   */
  await lti.registerPlatform({
    url: `https://${config.canvas.host}`,
    name: "GATECH", // domain name from canvas instance
    clientId: config.lti.clientId, // clientid from the lti plugin which you get inside canvas after installing the plugin
    authenticationEndpoint: `https://${config.lti.ssoHost}/api/lti/authorize_redirect`,
    accesstokenEndpoint: `https://${config.lti.ssoHost}/login/oauth2/token`,
    authConfig: {
      method: "JWK_SET",
      key: `https://${config.lti.ssoHost}/api/lti/security/jwks`,
    },
  });
};

setup();

logger.info(`app version is: ${process.env.APP_VERSION}`);

const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/lti", (req, res) => {
  return res.sendFile("index.html", { root: "dist" });
});

lti.app.use(router);

lti.app.set("trust proxy", config.trustProxy);

// view engine setup
lti.app.set("views", path.join(__dirname, "views"));
lti.app.set("view engine", "ejs");

lti.app.use(express.json({ limit: "10mb" }));
lti.app.use(express.urlencoded({ extended: false, limit: "10mb" }));
lti.app.use(express.static(path.join(__dirname, "..", "dist")));

lti.app.use(express.json({ limit: "10mb" }));
lti.app.use(express.urlencoded({ extended: false, limit: "10mb" }));
lti.app.use(express.static(path.join(__dirname, "..", "dist")));

lti.app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

lti.app.use("/api/", apiRouter);

// catch 404 and forward to error handler
lti.app.use((req, res, next) => {
  next(createError(404));
});

// error handler
lti.app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default lti.app;
