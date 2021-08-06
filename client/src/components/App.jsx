import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import qs from "qs";
import { Spinner, View } from "@instructure/ui";
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

    let analyticsId;
    try {
      analyticsId = qs.parse(queryParameters, {
        ignoreQueryPrefix: true,
      }).analyticsId;
    } catch (err) {}

    if (analyticsId) {
      ReactGA.initialize(analyticsId);
      ReactGA.set({ title: "LTI App" });
      ReactGA.pageview(window.location.pathname);
    }

    agent.getContext().then((response) => {
      setGotContext(true);
      if (response.data.version) {
        setVersionInfo(response.data.version);
      }
    });
  });

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
