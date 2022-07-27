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
    createEditorialsBundle: "./src/controllers/editorials/create-editorial-controller.js",
    editEditorialsBundle: "./src/controllers/editorials/edit-editorial-controller.js",
    authorsBundle: "./src/controllers/authors/list-authors-controller.js",
    createAuthorsBundle: "./src/controllers/authors/create-authors-controller.js",
    editAuthorsBundle: "./src/controllers/authors/edit-authors-controller.js",
    countriesBundle: "./src/controllers/countries/list-country-controller.js",
    createCountryBundle:"./src/controllers/countries/create-country-controller.js",
    editCountryBoundle:"./src/controllers/countries/edit-country-controller.js"
    
   
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
