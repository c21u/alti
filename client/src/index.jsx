import React from "react";
import ReactDOM from "react-dom";
import theme from "@instructure/ui-themes/lib/canvas";
import App from "./components/App";

theme.use();

const appRoot = document.getElementById("lti_root");

const appVersion = appRoot.getAttribute("data-app-version");
console.log("app version:");
console.log(appVersion);

ReactDOM.render(<App />, appRoot);
