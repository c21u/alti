// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// Enable dotenv, so we can get env vars from `.env` into the config here.
require("dotenv").config();

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.env = config.env || {};
  config.env.APP_URL = process.env.APP_URL;
  config.env.LTI_KEY = process.env.LTI_KEY;
  config.env.LTI_SECRET = process.env.LTI_SECRET;
  return config;
};
