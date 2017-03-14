const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    "./project/static/js/application.js",
  ],
  output: {
    path: __dirname + '/project/static/js/',
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
    root: [
      path.resolve('./project/static/js/'),
    ]
  },
};
