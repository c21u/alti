import React from "react";
import agent from "../agent";
import Text from "@instructure/ui-elements/lib/components/Text";
import View from "@instructure/ui-layout/lib/components/View";

/**
 * This component requests an endpoint that does a basic check of
 * Canvas API communication, and displays a success or error message.
 */
class CanvasStatus extends React.Component {
  /** @param {object} props */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      responseOk: null
    };
  }

  /** Send status check request when component mounts. */
  componentDidMount() {
    this.setState({ isLoading: true });
    agent.Canvas.status()
      .then(response => {
        if (!!response && !!response.status && response.status === "success") {
          this.setState({ isLoading: false, responseOk: true });
        } else {
          this.setState({ isLoading: false, responseOk: false });
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.error(err);
      });
  }

  /** @return {element} */
  render() {
    return (
      <View display="block">
        <Text>Canvas API check: </Text>
        {!!this.state.isLoading ? <Text>...</Text> : ""}
        {!this.state.isLoading && this.state.responseOk ? (
          <Text color="success">success</Text>
        ) : (
          ""
        )}
        {!this.state.isLoading && !this.state.responseOk ? (
          <Text color="error">error</Text>
        ) : (
          ""
        )}
      </View>
    );
  }
}

const Demo = () => {
  return (
    <View
      as="div"
      padding="small"
      background="default"
      maxWidth="90%"
      margin="small auto"
      borderWidth="medium"
      textAlign="center"
    >
      <Text as="p">A new LTI</Text>
      <CanvasStatus />
    </View>
  );
};

export default Demo;
