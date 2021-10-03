import Vue from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import vuetify from "./plugins/vuetify";
import VueMathjax from "vue-mathjax";
import "roboto-fontface/css/roboto/roboto-fontface.css";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  VueMathjax,
  render: (h) => h(App),
}).$mount("#app");
