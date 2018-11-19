const _superagent = require("superagent");
const superagentPromise = require("superagent-promise");
const parseLinkHeader = require("parse-link-header");
const canvasToken = require("../config")["canvasToken"];

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "https://gatech.instructure.com/api/v1";

const handleErrors = err => {
  return err;
};

const tokenPlugin = req => {
  req.set("Authorization", `Bearer ${canvasToken}`);
};

const responseBodyAndLinks = res => {
  let linkHeader = res.header.link;
  let links = parseLinkHeader(linkHeader);
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
      .then(responseBodyAndLinks),
  post: (url, data) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .send(data)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBodyAndLinks)
};
