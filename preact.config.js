'use strict';

const flowStripTypes = require('babel-plugin-transform-flow-strip-types');
const emotionPlugin = require('babel-plugin-emotion');

module.exports = (config) => {
  const loaders = config.module.loaders;
  const babelLoader = loaders.filter((loader) => {
    return loader.loader === 'babel-loader';
  })[0];

  babelLoader.options.plugins.push(flowStripTypes);
  babelLoader.options.plugins.push(emotionPlugin);
};
