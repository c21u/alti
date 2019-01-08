require("dotenv").config();

const getEnvVarOrDefault = (envVar, defaultValue) => {
  defaultValue = defaultValue || "CHANGEME";
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    console.warn(`${envVar} not set: using default ${defaultValue}`);
    return defaultValue;
  }
};

const getEnvVarOrNull = envVar => {
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    return null;
  }
};

const getEnvVarOrThrow = envVar => {
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    throw new Error(`Unrecoverable: missing process.env.${envVar}`);
  }
};

const config = {};
try {
  config.buzzAPI = {
    appID: getEnvVarOrDefault("BUZZAPI_APP_ID"),
    password: getEnvVarOrDefault("BUZZAPI_PASSWORD")
  };
  config.canvasApiUrl = getEnvVarOrDefault("CANVAS_API_URL");
  config.canvasToken = getEnvVarOrDefault("CANVAS_TOKEN");
  config.fakeStrategyCredentials = {};
  config.httpLogsFormat = "combined";
  config.googleAnalyticsID = getEnvVarOrNull("GOOGLE_ANALYTICS_ID");
  config.jwtSecret = getEnvVarOrDefault("JWT_SECRET");
  config.lti = {
    key: getEnvVarOrThrow("LTI_KEY"),
    secret: getEnvVarOrThrow("LTI_SECRET")
  };
  config.passportStrategy = "lti";
  config.sentryDSN = getEnvVarOrNull("SENTRY_DSN");
  config.trustProxy = getEnvVarOrDefault("TRUST_PROXY", "loopback");
} catch (err) {
  console.error(err);
}

if (process.env.NODE_ENV === "development") {
  config["httpLogsFormat"] = "dev";
}

if (process.env.NODE_ENV === "test") {
  console.warn(`Fake auth strategy enabled!`);
  config["fakeStrategyCredentials"] = {
    username: getEnvVarOrDefault("FAKE_USERNAME"),
    password: getEnvVarOrDefault("FAKE_PASSWORD")
  };
  config["passportStrategy"] = "fake";
}

module.exports = config;
