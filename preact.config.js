'use strict';

require('dotenv').config();

const flowStripTypes = require('babel-plugin-transform-flow-strip-types');
const emotionPlugin = require('babel-plugin-emotion');
const process = require('process');

module.exports = (config, env, helpers) => {
  const loaders = config.module.loaders;
  const babelLoader = loaders.filter((loader) => {
    return loader.loader === 'babel-loader';
  })[0];

  babelLoader.options.plugins.push(flowStripTypes);
  babelLoader.options.plugins.push(emotionPlugin);

  config.plugins.push(
    new helpers.webpack.DefinePlugin({
      'process.env.WS_ADDRESS': `"${process.env.WS_ADDRESS}"`
    })
  );
};
