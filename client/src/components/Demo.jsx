import React, { useEffect, useState } from "react";
import agent from "../agent";
import { Text, View } from "@instructure/ui";

/**
 * This component requests an endpoint that does a basic check of
 * Canvas API communication, and displays a success or error message.
 *
 * @return {Component}
 */
const CanvasStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [responseOk, setResponseOk] = useState(null);

  /** Send status check request when component mounts. */
  useEffect(() => {
    agent.Canvas.status()
      .then((response) =>
        setResponseOk(
          !!response && !!response.status && response.status === "success"
        )
      )
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  });

  return (
    <View display="block">
      <Text>Canvas API check: </Text>
      {!!isLoading ? <Text>...</Text> : ""}
      {!isLoading && responseOk ? <Text color="success">success</Text> : ""}
      {!isLoading && !responseOk ? <Text color="danger">error</Text> : ""}
    </View>
  );
};

const Demo = () => {
  return (
    <View
      as="div"
      padding="small"
      maxWidth="90%"
      margin="small auto"
      textAlign="center"
    >
      <Text as="p">A new LTI</Text>
      <CanvasStatus />
    </View>
  );
};

export default Demo;
