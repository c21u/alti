const logger = require("../lib/logger");

module.exports = Data => req => {
  return Data.getAccounts
    .then(response => {
      if (!response.body) {
        return { status: "error" };
      }
      return { status: "success" };
    })
    .catch(err => {
      logger.error(err);
      return { status: "error" };
    });
};
