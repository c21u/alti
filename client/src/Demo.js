import React from "react";
import Text from "@instructure/ui-elements/lib/components/Text";
import View from "@instructure/ui-layout/lib/components/View";

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
      <Text as="p">Canvas status...</Text>
    </View>
  );
};

export default Demo;
