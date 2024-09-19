const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Sentry = require("@sentry/node");
const sentryDSN = require("./config")["sentryDSN"];
const logger = require("./lib/logger");
const router = express.Router();

const lti = require('ltijs').Provider
const Database = require('ltijs-sequelize')

Sentry.init({ dsn: sentryDSN });

const db = new Database(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, 
  { 
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false 
  }
)

lti.setup(process.env.LTI_KEY,
  { 
    plugin: db
  },
  {
  staticPath: "dist",
  cookies: {
    secure: false,
    sameSite: 'None'
  },
  tokenMaxAge: false,
  devMode: true
})

// When receiving successful LTI launch redirects to app
lti.onConnect(async (token, req, res) => {
  return res.sendFile("index.html", { root: "dist" });
})

// When receiving deep linking request redirects to deep screen
lti.onDeepLinking(async (token, req, res) => {
  return lti.redirect(res, '/deeplink', { newResource: true })
})


// Setup function
const setup = async () => {
  await lti.deploy({ port: process.env.PORT || "3000" })

  /**
   * Register platform
   */
  await lti.registerPlatform({
    url: process.env.CANVAS_URL,
    name: 'GATECH', // domain name from canvas instance
    clientId: process.env.CLIENT_ID, // clientid from the lti plugin which you get inside canvas after installing the plugin
    authenticationEndpoint: process.env.CANVAS_URL + '/api/lti/authorize_redirect',
    accesstokenEndpoint: process.env.CANVAS_URL + '/login/oauth2/token',
    authConfig: { method: 'JWK_SET', key: process.env.CANVAS_URL + '/api/lti/security/jwks' }
  })
}


setup()


logger.info(`app version is: ${process.env.APP_VERSION}`);

router.get('/lti', (req, res) => {
   return res.sendFile("index.html", { root: "dist" });
})

lti.app.use(router);

lti.app.set("trust proxy", require("./config")["trustProxy"]);
lti.app.use(Sentry.Handlers.requestHandler());

//view engine setup
lti.app.set("views", path.join(__dirname, "views"));
lti.app.set("view engine", "ejs");

lti.app.use(express.json({ limit: "10mb" }));
lti.app.use(express.urlencoded({ extended: false, limit: "10mb" }));
lti.app.use(cookieParser());
lti.app.use(express.static(path.join(__dirname, "..", "dist")));

lti.app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const apiRouter = require("./routes/api");
lti.app.use("/api/", apiRouter);

//catch 404 and forward to error handler
lti.app.use(function (req, res, next) {
  next(createError(404));
});

lti.app.use(Sentry.Handlers.errorHandler());

// error handler
lti.app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = lti.app;
