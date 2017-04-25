const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    "./capgen/static/js/application.js",
  ],
  output: {
    path: __dirname + '/capgen/static/js/',
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [],
  resolve: {
    modules: [
      path.resolve('./capgen/static/js/'),
      path.resolve('./node_modules/'),
    ]
  },
};
