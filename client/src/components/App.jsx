import React from "react";
import Spinner from "@instructure/ui-elements/lib/components/Spinner";
import View from "@instructure/ui-layout/lib/components/View";
import agent from "../agent";
import Demo from "./Demo";
import Layout from "./Layout";

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
    agent.getContext().then(response => {
      console.log(`app version:`);
      console.log(`${response.data.version}`);
      this.setState({ gotContext: true });
    });
  }

  /**
   * @return {Element} Render the App component.
   */
  render() {
    return (
      <Layout>
        {this.state.gotContext ? (
          <Demo />
        ) : (
          <View as="div" margin="large auto" textAlign="center">
            <Spinner size="large" title="Loading..." />
          </View>
        )}
      </Layout>
    );
  }
}

export default App;
