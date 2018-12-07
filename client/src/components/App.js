import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Demo from "./Demo";

/** App top-level component */
@inject("CommonStore")
@observer
class App extends React.Component {
  /**
   * @return {Element} Render the App component.
   */
  render() {
    return (
      <>
        {this.props.CommonStore.jwt ? (
          <Demo />
        ) : (
          <p>Error: invalid token.</p>
        )}
      </>
    );
  }
}
App.propTypes = {
  CommonStore: PropTypes.shape({
    jwt: PropTypes.string
  })
};

export default App;
