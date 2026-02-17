import React, { useEffect, useState } from "react";
import { Spinner } from "@instructure/ui-spinner";
import { View } from "@instructure/ui-view";
import agent from "../agent";
import Demo from "./Demo";
import Layout from "./Layout";

/**
 * App top-level component
 *
 * @return {Component}
 */
const App = () => {
  const [gotContext, setGotContext] = useState(false);
  const [versionInfo, setVersionInfo] = useState(null);

  useEffect(() => {
    const queryParameters = window.location.search;

    agent.getContext().then((response) => {
      setGotContext(true);
      if (response.data.version) {
        setVersionInfo(response.data.version);
      }
    });
  }, []);

  return (
    <Layout versionInfo={versionInfo || ""}>
      {gotContext ? (
        <Demo />
      ) : (
        <View as="div" margin="large auto" textAlign="center">
          <Spinner size="large" renderTitle="Loading..." />
        </View>
      )}
    </Layout>
  );
};

export default App;
