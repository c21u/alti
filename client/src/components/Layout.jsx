import React from "react";
import PropTypes from "prop-types";
import { Text } from "@instructure/ui-elements";
import { View } from "@instructure/ui-layout";

const Layout = ({ children, versionInfo }) => (
  <View
    display="block"
    padding="small"
    background="light"
    maxWidth="97%"
    margin="small auto"
    textAlign="center"
  >
    <View display="block" background="default" padding="small">
      {children}
      <View display="block">
        <Text color="secondary" size="x-small">
          {versionInfo}
        </Text>
      </View>
    </View>
  </View>
);
Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  versionInfo: PropTypes.string
};

export default Layout;
