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
  host: getEnvVarOrDefault("CANVAS_HOST"),
  token: getEnvVarOrDefault("CANVAS_TOKEN"),
};

export const db = {
  name: getEnvVarOrDefault("DB_NAME", "postgres"),
  user: getEnvVarOrDefault("DB_USER", "postgres"),
  pass: getEnvVarOrDefault("DB_PASS", "altidb"),
  host: getEnvVarOrDefault("DB_HOST", "db"),
};

export const jwtSecret = getEnvVarOrDefault("JWT_SECRET");

export const lti = {
  key: getEnvVarOrDefault("LTI_KEY"),
  clientId: getEnvVarOrDefault("CLIENT_ID"),
  ssoHost: getEnvVarOrDefault("LTI_SSO_HOST"),
};

export const logLevel =
  process.env.NODE_ENV === "development"
    ? "debug"
    : process.env.NODE_ENV === "test"
    ? "error"
    : getEnvVarOrDefault("LOG_LEVEL", "info");

export const trustProxy = getEnvVarOrDefault("TRUST_PROXY", "loopback");

const config = {
  buzzAPI,
  canvas,
  db,
  jwtSecret,
  lti,
  logLevel,
  trustProxy,
};

export default config;
