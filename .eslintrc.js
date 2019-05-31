module.exports = {
  extends: [
    "google",
    "plugin:react/recommended",
    "plugin:cypress/recommended",
    "plugin:prettier/recommended"
  ],
  env: {
    "cypress/globals": true,
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  plugins: ["cypress", "react"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  parser: "babel-eslint",
  rules: {
    "no-undef": "error"
  }
};
