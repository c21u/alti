import React from "react";
import Spinner from "@instructure/ui-elements/lib/components/Spinner";
import View from "@instructure/ui-layout/lib/components/View";
import agent from "../agent";
import Demo from "./Demo";

/** App top-level component */
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
    agent.getContext().then(() => {
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

export default App;
