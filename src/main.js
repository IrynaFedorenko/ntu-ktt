import Vue from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import vuetify from "./plugins/vuetify";
import VueKatex from "vue-katex";
import i18n from "./plugins/i18n/i18n";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "katex/dist/katex.min.css";

Vue.config.productionTip = false;

Vue.use(VueKatex, {
  globalOptions: {},
});

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
