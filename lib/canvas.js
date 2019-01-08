const _superagent = require("superagent");
const superagentPromise = require("superagent-promise");
const parseLinkHeader = require("parse-link-header");
const canvasToken = require("../config").canvas.token;

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = require("../config").canvas.apiUrl;

const handleErrors = err => {
  return err;
};

const tokenPlugin = req => {
  req.set("Authorization", `Bearer ${canvasToken}`);
};

const responseBodyAndLinks = res => {
  const linkHeader = res.header.link;
  const links = parseLinkHeader(linkHeader);
  return {
    body: res.body,
    links
  };
};

module.exports = {
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBodyAndLinks)
};
