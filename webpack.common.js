const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const instructureUiConfig = require("@instructure/ui-webpack-config");

module.exports = {
  ...instructureUiConfig,
  entry: {
    app: "./client/src/index.jsx"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/env",
              "@babel/preset-react",
              require("@instructure/ui-babel-preset")
            ]
          }
        }
      }
    ]
  },
  plugins: [
    ...instructureUiConfig.plugins,
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "client/src/index.html"
    })
  ],
  resolve: { extensions: [".js", ".jsx"] }
};
