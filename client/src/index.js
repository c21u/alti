import React from "react";
import ReactDOM from "react-dom";
import theme from "@instructure/ui-themes/lib/canvas";
import jwtDecode from "jwt-decode";
import qs from "qs";
import App from "./App";
import CommonContext from "./context";

theme.use();

/**
 * Look for a JWT in location query parameters.
 * @return {?string}
 */
function grabJWT() {
  try {
    let jwt = qs.parse(window.location.search, { ignoreQueryPrefix: true })
      .token;
    jwtDecode(jwt);
    return jwt;
  } catch (reason) {
    console.error(reason);
  }
  return null;
}

/**
 * App container.
 */
class AppContainer extends React.Component {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      jwt: grabJWT()
    };
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <div>
        {this.state.jwt ? (
          <CommonContext.Provider value={this.state.jwt}>
            <App />
          </CommonContext.Provider>
        ) : (
          <p>
            TODO: error message instead of the app, because getting JWT failed.
          </p>
        )}
      </div>
    );
  }
}

ReactDOM.render(<AppContainer />, document.getElementById("lti_root"));
