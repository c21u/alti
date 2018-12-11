const bunyan = require("bunyan");

// eslint-disable-next-line new-cap
const logger = new bunyan.createLogger({
  name: "LTI project",
  streams: [
    {
      level: "info",
      stream: process.stdout
    }
  ]
});

module.exports = logger;
