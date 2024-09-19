import jwtDecode from "jwt-decode";
import qs from "qs";
import superagent from "superagent";

const API_ROOT = "/api";
const QUERY_PARAMETERS = window.location.search;

/**
 * @param {string} item
 * @return {(string|boolean)}
 */
function parseQueryParams(item) {
  if (!item) return false;
  try {
    return qs.parse(QUERY_PARAMETERS, { ignoreQueryPrefix: true })[item];
  } catch (reason) {
    console.error(reason);
  }
  return false;
}

const handleErrors = (err) => {
  return err;
};

const responseBody = (res) => res.body;

const tokenPlugin = (req) => {
  try {
    req.set("Authorization", `Bearer ${getLtik()}`);
  } catch (reason) {
    console.error(reason);
  }
};

const requests = {
  get: (url) => {
    return superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBody);
  },
};

const Canvas = {
  status: () => {
    return requests.get(`/canvas-status/`);
  },
};

const getLtik = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const ltik = searchParams.get('ltik')
  if (!ltik) throw new Error('Missing lti key.')
  return ltik
}

const getContext = () => requests.get(`/context/`);

export default {
  Canvas,
  getContext,
};
