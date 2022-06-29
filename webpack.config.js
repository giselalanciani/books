const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    homeBundle: "./src/controllers/home-controller.js",
    booksBundle: "./src/controllers/books/list-books-controller.js",
    editBundle: "./src/controllers/books/edit-books-controller.js",
    createBundle: "./src/controllers/books/create-books-controller.js",
    editorialsBundle: "./src/controllers/editorials/list-editorial-controller.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist", "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: { version: 3 } },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
