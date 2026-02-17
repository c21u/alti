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

const getEnvVarOrThrow = (envVar, error) => {
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    throw new Error(
      error ? error : `Couldn't read environment var "${envVar}"`,
    );
  }
};

/* Set default values assuming NODE_ENV === production */

export const buzzAPI = {
  appID: getEnvVarOrNull("BUZZAPI_APP_ID"),
  password: getEnvVarOrNull("BUZZAPI_PASSWORD"),
};

export const canvas = {
  token: getEnvVarOrNull("CANVAS_TOKEN"),
};

export const db = {
  name: getEnvVarOrDefault("DB_NAME", "postgres"),
  user: getEnvVarOrDefault("DB_USER", "postgres"),
  pass: getEnvVarOrDefault("DB_PASS", "altidb"),
  host: getEnvVarOrDefault("DB_HOST", "db"),
};

export const lti = {
  url: getEnvVarOrDefault("LTI_URL", "https://canvas.test.instructure.com"),
  name: getEnvVarOrDefault("LTI_NAME", "GATECH"),
  key: getEnvVarOrThrow("LTI_KEY"),
  clientId: getEnvVarOrThrow("CLIENT_ID"),
  ssoHost: getEnvVarOrDefault("LTI_SSO_HOST", "sso.test.canvaslms.com"),
};

export const logLevel = getEnvVarOrDefault(
  "LOG_LEVEL",
  process.env.NODE_ENV === "development"
    ? "debug"
    : process.env.NODE_ENV === "test"
      ? "error"
      : "info",
);

export const trustProxy = getEnvVarOrDefault("TRUST_PROXY", "loopback");

const config = {
  buzzAPI,
  canvas,
  db,
  lti,
  logLevel,
  trustProxy,
};

export default config;
