const fs = require("fs");
const bunyan = require("bunyan");
const RotatingFileStream = require("bunyan-rotating-file-stream");

// Make sure the logs directory exists
try {
  fs.mkdirSync("./logs", 0o755);
} catch (err) {
  // If the error was anything except the directory already existing there's a problem
  if (err.code !== "EEXIST") {
    throw new Error(err);
  }
}

// eslint-disable-next-line new-cap
const logger = new bunyan.createLogger({
  name: "project name",
  streams: [
    {
      stream: new RotatingFileStream({
        type: "rotating-file",
        path: "./logs/server-%Y%m%d.log",
        period: "1d",
        totalFiles: 7,
        rotateExisting: true,
        threshold: "5m",
        totalSize: "10m",
        gzip: true
      })
    },
    {
      level: "info",
      stream: process.stdout
    }
  ]
});

module.exports = logger;
