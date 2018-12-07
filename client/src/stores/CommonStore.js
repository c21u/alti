import jwtDecode from "jwt-decode";
import qs from "qs";
import { action, observable } from "mobx";
import agent from "../agent";

const queryParameters = window.location.search;

/**
 * @param {string} item
 * @return {(string|boolean)}
 */
function parseQueryParams(item) {
  if (!item) return false;
  try {
    return qs.parse(queryParameters, { ignoreQueryPrefix: true })[item];
  } catch (reason) {
    console.error(reason);
  }
  return false;
}

/**
 * Parse query parameters for expected JWT.
 * @return {(string|boolean)}
 */
function getJWT() {
  const token = parseQueryParams("token");
  try {
    jwtDecode(token);
    return token;
  } catch (reason) {
    console.error(reason);
  }
  return false;
}

/** shared store */
class CommonStore {
  @observable
  context = {};

  @observable
  isLoading = false;

  @observable
  jwt = getJWT();

  @observable
  googleAnalyticsID = parseQueryParams("ga");

  /**
   * Context Requester
   * @return {Promise}
   */
  $req() {
    return agent.Context.get();
  }

  /** @return {Promise} */
  @action
  requestContext() {
    this.isLoading = true;
    return this.$req()
      .then(
        action(response => {
          this.context = response.context;
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }
}

const store = new CommonStore();
export default store;
