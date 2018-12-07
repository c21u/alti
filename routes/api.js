let express = require("express");
// eslint-disable-next-line new-cap
let router = express.Router();
let jwtMiddleware = require("../lib/jwt");
let canvas = require("../lib/canvas");
let logger = require("../lib/logger");

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

module.exports = router;
