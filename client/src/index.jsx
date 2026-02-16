import React from "react";
import { createRoot } from "react-dom/client";
import { theme } from "@instructure/canvas-theme";
import { InstUISettingsProvider } from "@instructure/emotion";
import App from "./components/App";

const root = createRoot(document.getElementById("lti_root"));
root.render(
  <InstUISettingsProvider theme={theme}>
    <App />
  </InstUISettingsProvider>,
);
