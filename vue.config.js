const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: path.resolve(__dirname, "node_modules/vue/dist/vue.runtime.esm.js"),
        "^vuetify": path.resolve(__dirname, "node_modules/vuetify"),
        views: path.resolve(__dirname, "src/views"),
        components: path.resolve(__dirname, "src/components"),
        calculation: path.resolve(__dirname, "src/calculation"),
      },
    },
  },

  transpileDependencies: ["vuetify"],
};
