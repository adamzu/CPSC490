const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    "./static/js/application.js",
  ],
  output: {
    path: __dirname + '/static/js/',
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
      path.resolve('./static/js/'),
      path.resolve('./node_modules/'),
    ]
  },
};
