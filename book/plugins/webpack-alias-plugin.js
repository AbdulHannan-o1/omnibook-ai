const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'webpack-alias-plugin',
    configureWebpack(config, isServer) {
      return {
        resolve: {
          alias: {
            '@site-frontend': path.resolve(__dirname, '../../frontend/src'),
          },
        },
      };
    },
  };
};
