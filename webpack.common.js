const path = require("path");
const webpack = require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "client/src"),
  entry: {
    app: "./index.jsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: { extensions: [".js", ".jsx"] },
        use: {
          loader: "babel-loader",
          options: { sourceType: "module" },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HTMLWebpackPlugin({
      template: "index.html",
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
  ],
};
