import pino from "pino";

export default pino({
  name: "alti",
  level: process.env.LOG_LEVEL || "info",
});
