const flowStripTypes = require('babel-plugin-transform-flow-strip-types');
const emotionPlugin = require('babel-plugin-emotion');

module.exports = (config) => {
  const loaders = config.module.loaders;
  const babelLoader = loaders.filter((loader) => {
    return loader.loader === 'babel-loader';
  })[0];

  babelLoader.options.presets = [
    ['env', {
      targets: {
        browsers: ['last 2 versions']
      }
    }],
    'react'
  ];
  babelLoader.options.plugins.push(flowStripTypes);
  babelLoader.options.plugins.push(emotionPlugin);
};
