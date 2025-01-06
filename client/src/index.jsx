import React from "react";
import { createRoot } from "react-dom/client";
import { canvas } from "@instructure/ui-themes";
import { InstUISettingsProvider } from "@instructure/emotion";
import App from "./components/App";

const root = createRoot(document.getElementById("lti_root"));
root.render(
  <InstUISettingsProvider theme={canvas}>
    <App />
  </InstUISettingsProvider>,
);
