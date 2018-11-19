import jwtDecode from "jwt-decode";
import qs from "qs";
import { computed } from "mobx";

const queryParameters = window.location.search;

/** shared store */
class CommonStore {
  /**
   * Return the JWT from query parameters, or return false if the validation fails.
   * @return {(string|boolean)}
   */
  @computed
  get jwt() {
    try {
      const token = qs.parse(queryParameters, { ignoreQueryPrefix: true })
        .token;
      jwtDecode(token);
      return token;
    } catch (reason) {
      console.error(reason);
    }
    return false;
  }

  /**
   * Return the Analytics ID from query parameters, or false.
   * @return {(string|boolean)}
   */
  @computed
  get googleAnalyticsID() {
    try {
      return qs.parse(queryParameters, { ignoreQueryPrefix: true }).ga;
    } catch (reason) {
      console.error(reason);
    }
    return false;
  }
}

const store = new CommonStore();
export default store;
