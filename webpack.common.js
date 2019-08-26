const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
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
        resolve: { extensions: [".js", ".jsx"] },
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      ...instructureUiConfig.module.rules
    ]
  },
  plugins: [
    ...instructureUiConfig.plugins,
    new CleanWebpackPlugin(["dist"]),
    new HTMLWebpackPlugin({
      template: "client/src/index.html"
    })
  ],
  resolveLoader: {
    alias: { ...instructureUiConfig.resolveLoader.alias }
  }
};
