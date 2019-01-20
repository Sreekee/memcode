const config = require('./webpack.config.js');
const webpack = require('webpack');
const sharedPlugins = require('./webpack.sharedPlugins');

module.exports = {
  entry: config.entry,

  module: config.module,

  resolve: config.resolve,

  plugins: [
    ...sharedPlugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  output: config.output
};
