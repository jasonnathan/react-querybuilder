"use strict";

let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          use: [{loader: "css-loader"}, {loader: "sass-loader"}],
        }),
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },

  plugins: [new ExtractTextPlugin("query-builder.css")],
};
