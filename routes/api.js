const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const jwtMiddleware = require("../lib/jwt");
const canvas = require("../lib/canvas");
const createContext = require("../lib/util").createContext;

router.use(jwtMiddleware);

router.get("/context", (req, res, next) => {
  res.send({ context: createContext(req.user) });
});

router.get("/canvas-status", (req, res, next) => {
  canvas
    .get("/accounts")
    .then(response => {
      if (!response.body) {
        res.send({ status: "error" });
      }
      res.send({ status: "success" });
    })
    .catch(err => {
      console.error(err);
      res.send({ status: "error" });
    });
});

module.exports = router;
