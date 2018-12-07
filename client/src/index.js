import React from "react";
import ReactDOM from "react-dom";
import theme from "@instructure/ui-themes/lib/canvas";
import { Provider } from "mobx-react";
import App from "./components/App";
import CommonStore from "./stores/CommonStore";

theme.use();

const stores = { CommonStore };

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("lti_root")
);
