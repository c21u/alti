const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const jwtMiddleware = require("../lib/jwt");
const canvas = require("../lib/canvas");
const logger = require("../lib/logger");

/**
 * Create context based on the incoming request user.
 * @param {object} user
 * @return {object}
 */
const createContext = user => {
  if (!!user && !!user.custom_canvas_course_id && !!user.custom_lis_user_id) {
    return {
      courseID: user.custom_canvas_course_id,
      userID: user.custom_lis_user_id
    };
  } else {
    logger.error("Failure");
    return {};
  }
};

router.use(jwtMiddleware);

router.get("/context", (req, res, next) => {
  let context;
  try {
    context = createContext(req.user);
  } catch (reason) {
    logger.error({ err: reason });
  }
  res.send({ context });
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
