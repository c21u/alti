import bunyan from "bunyan";
import { logLevel } from "../config.js";

/**
 * @return {*}
 */
const getLogLevel = () => {
  // Bunyan log levels: fatal, error, warn, info, debug, trace.
  // Add a mapping if the setting in config.js changes.
  switch (logLevel) {
    case "debug":
      return bunyan.DEBUG;
    case "error":
      return bunyan.ERROR;
    default:
      return bunyan.INFO;
  }
};

// eslint-disable-next-line new-cap
const logger = new bunyan.createLogger({
  name: "alti",
  streams: [
    {
      level: getLogLevel(),
      stream: process.stdout,
    },
  ],
});

export default logger;
