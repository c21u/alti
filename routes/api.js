let express = require("express");
// eslint-disable-next-line new-cap
let router = express.Router();
let jwtMiddleware = require("../lib/jwt");
let canvas = require("../lib/canvas");

const accounts = {
  list: () => canvas.get("/accounts")
};

router.use(jwtMiddleware);

router.get("/demo", (req, res, next) => {
  accounts
    .list()
    .then(response => {
      res.send({
        data: response.body
      });
    })
    .catch(err => console.error(err));
});

module.exports = router;
