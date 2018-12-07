import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Spinner from "@instructure/ui-elements/lib/components/Spinner";
import View from "@instructure/ui-layout/lib/components/View";
import Demo from "./Demo";

/** App top-level component */
@inject("CommonStore")
@observer
class App extends React.Component {
  /** @param {object} props */
  constructor(props) {
    super(props);
    this.state = {
      gotContext: false
    };
  }

  /**
   * Request context when component mounts.
   */
  componentDidMount() {
    this.props.CommonStore.requestContext().then(() => {
      this.setState({ gotContext: true });
    });
  }

  /**
   * @return {Element} Render the App component.
   */
  render() {
    return this.state.gotContext ? (
      <Demo />
    ) : (
      <View as="div" margin="large auto" textAlign="center">
        <Spinner size="large" title="Loading..." />
      </View>
    );
  }
}
App.propTypes = {
  CommonStore: PropTypes.shape({
    jwt: PropTypes.string,
    context: PropTypes.shape({
      courseID: PropTypes.string,
      userID: PropTypes.string
    }),
    requestContext: PropTypes.func.isRequired
  })
};

export default App;
