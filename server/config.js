import "dotenv/config";

const getEnvVarOrDefault = (envVar, defaultValue) => {
  defaultValue = defaultValue || envVar;
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    return defaultValue;
  }
};

const getEnvVarOrNull = (envVar) => {
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    return null;
  }
};

/* Set default values assuming NODE_ENV === production */

export const buzzAPI = {
  appID: getEnvVarOrDefault("BUZZAPI_APP_ID"),
  password: getEnvVarOrDefault("BUZZAPI_PASSWORD"),
};

export const canvas = {
  apiUrl: getEnvVarOrDefault("CANVAS_API_URL"),
  token: getEnvVarOrDefault("CANVAS_TOKEN"),
};

export const jwtSecret = getEnvVarOrDefault("JWT_SECRET");

export const lti = {
  key: getEnvVarOrDefault("LTI_KEY"),
  secret: getEnvVarOrDefault("LTI_SECRET"),
};

export const logLevel =
  process.env.NODE_ENV === "development"
    ? "debug"
    : process.env.NODE_ENV === "test"
    ? "error"
    : getEnvVarOrDefault("LOG_LEVEL", "info");

export const passportStrategy = "lti";

export const trustProxy = getEnvVarOrDefault("TRUST_PROXY", "loopback");

const config = {
  buzzAPI,
  canvas,
  jwtSecret,
  lti,
  logLevel,
  passportStrategy,
  trustProxy,
};

export default config;
