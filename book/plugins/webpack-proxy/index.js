// book/plugins/webpack-proxy/index.js
module.exports = function (context, options) {
  return {
    name: "custom-webpack-proxy-plugin",
    configureWebpack(config, isServer, utils) {
      return {
        mergeStrategy: {
          "devServer.proxy": "replace"
        },
        devServer: {
          proxy: [
            {
              context: "/api",
              target: "http://127.0.0.1:8000",
              secure: false,
              changeOrigin: true,
              logLevel: "debug",
              pathRewrite: { "^/api/chatbot": "/api/v1/chatbot/chat" },
            },
          ],
        },
      };
    },
  };
};