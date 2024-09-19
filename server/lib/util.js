const qs = require("qs");

const getRole = (userRoles) => {
  const instructorRegex = /.*instructor.*/i;
  const learnerRegex = /.*learner.*/i;

  let isInstructor = false;
  let isLearner = false;

  if (!userRoles) {
    return "none";
  }

  userRoles.forEach((role) => {
    if (instructorRegex.test(role)) {
      isInstructor = true;
    } else if (learnerRegex.test(role)) {
      isLearner = true;
    }
  });

  if (isInstructor && isLearner) return "both";
  if (isLearner) return "learner";
  if (isInstructor) return "instructor";
  return "unknown";
};

module.exports = {
  createContext: (req, res) => {
    const token = res.locals.token
    const context = res.locals.context
  
    const info = {}
    if (token.userInfo) {
      if (token.userInfo.name) info.name = token.userInfo.name
      if (token.userInfo.email) info.email = token.userInfo.email
    }
  
    if (context.roles) info.roles = context.roles
    if (context.context) info.context = context.context

    // courseId: user.custom_canvas_course_id || null,
    return {
      userId: info.name,
      userRole: info.roles,
      info: info,
      idtoken : res.locals.idtoken 
    }
  },
  parseQueryParameters: (headers) => {
    // match / or ? or both at the start of the location string, and remove.
    const queryString = headers.location.replace(/^\/?\??/, "");
    return qs.parse(queryString, {
      ignoreQueryPrefix: true,
    });
  },
};
