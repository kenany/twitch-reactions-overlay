'use strict';

require('dotenv').config();

import flowStripTypes from '@babel/plugin-transform-flow-strip-types';
import emotionPlugin from 'babel-plugin-emotion';
import process from 'process';

export default (config, env, helpers) => {
  const { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];

  rule.options.plugins.push(flowStripTypes);
  rule.options.plugins.push(emotionPlugin);

  config.plugins.push(
    new helpers.webpack.DefinePlugin({
      'process.env.WS_ADDRESS': `"${process.env.WS_ADDRESS}"`
    })
  );
};
