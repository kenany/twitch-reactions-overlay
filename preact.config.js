'use strict';

require('dotenv').config();

import flowStripTypes from '@babel/plugin-transform-flow-strip-types';
import emotionPlugin from 'babel-plugin-emotion';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import process from 'process';
import TerserPlugin from 'terser-webpack-plugin';

export default (config, env, helpers) => {
  const { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];

  rule.options.plugins.push(flowStripTypes);
  rule.options.plugins.push(emotionPlugin);

  config.plugins.push(
    new helpers.webpack.DefinePlugin({
      'process.env.WS_ADDRESS': `"${process.env.WS_ADDRESS}"`
    })
  );

  config.optimization.minimizer = [
    new TerserPlugin({
      cache: true,
      extractComments: false,
      parallel: true,
      sourceMap: true,
      terserOptions: {
        compress: {
          hoist_funs: true,
          keep_fargs: false,
          pure_getters: true,
          pure_funcs: [
            'classCallCheck',
            '_classCallCheck',
            '_possibleConstructorReturn',
            'Object.freeze',
            'invariant',
            'warning'
          ]
        },
        mangle: true,
        output: { comments: false }
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { reduceIdents: false }
    })
  ];
};
