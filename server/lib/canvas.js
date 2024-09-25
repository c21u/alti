import superagent from "superagent";
import parseLinkHeader from "parse-link-header";

import { canvas as cfg } from "../config.js";
const canvasToken = cfg.token;
const API_ROOT = `https://${cfg.host}/api/v1`;

const handleErrors = (err) => {
  return err;
};

const tokenPlugin = (req) => {
  req.set("Authorization", `Bearer ${canvasToken}`);
};

const responseBodyAndLinks = (res) => {
  const linkHeader = res.header.link;
  const links = parseLinkHeader(linkHeader);
  return {
    body: res.body,
    links,
  };
};

export default {
  get: (url) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBodyAndLinks),
};
