import _superagent from "superagent";
import superagentPromise from "superagent-promise";
import CommonStore from "./stores/CommonStore";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "/api";

const handleErrors = err => {
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  if (CommonStore.jwt) {
    req.set("Authorization", `Bearer ${CommonStore.jwt}`);
  }
};

const requests = {
  get: url => {
    return superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody);
  }
};

const Context = {
  get: () => {
    return requests.get(`/context/`);
  }
};

export default {
  Context
};
