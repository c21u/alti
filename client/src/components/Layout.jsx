import React from "react";
import PropTypes from "prop-types";
import View from "@instructure/ui-layout/lib/components/View";

const Layout = ({ children }) => (
  <View
    display="block"
    padding="small"
    background="light"
    maxWidth="87%"
    margin="small auto"
    textAlign="center"
  >
    <View display="block" background="default" padding="small">
      {children}
    </View>
  </View>
);
Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default Layout;
