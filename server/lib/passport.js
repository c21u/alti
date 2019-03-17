const passport = require("passport");
const PassportLTIStrategy = require("passport-lti");
const PassportLocalStrategy = require("passport-local");
const imsLTI = require("ims-lti");
const fakeAuth = require("../config")["fakeStrategyCredentials"];
const ltiAuth = require("../config")["lti"];

const ltiStrategy = new PassportLTIStrategy(
  {
    createProvider: (req, done) => {
      const key = req.body.oauth_consumer_key;
      if (key === ltiAuth.key) {
        return done(null, new imsLTI.Provider(key, ltiAuth.secret));
      } else {
        // createProvider expects failure-to-lookup-credentials case to
        // return with a single string, not a Passport verify signature
        done("Not authorized.");
      }
    }
  },
  (ltiContext, done) => done(null, ltiContext)
);

const fakeStrategy = new PassportLocalStrategy(
  { passReqToCallback: true },
  (req, username, password, done) => {
    if (username === fakeAuth.username && password === fakeAuth.password) {
      const fakeUser = {
        custom_canvas_course_id: req.body.fakeCourseId || "",
        custom_lis_user_username: req.body.fakeUsername || "",
        roles: [req.body.fakeUserRole] || []
      };
      return done(null, fakeUser);
    }
    return done(null, false);
  }
);

const strategyToUse = require("../config")["passportStrategy"];
strategyToUse === "fake"
  ? passport.use("fake", fakeStrategy)
  : passport.use("lti", ltiStrategy);

module.exports = passport;