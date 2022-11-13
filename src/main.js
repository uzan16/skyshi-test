import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import http from "./plugins/http";
import helper from "./plugins/helper";
import store from "./store";
import "./assets/scss/styles.scss";

import ContentWrapper from "@/components/organism/content";

Vue.component("ContentWrapper", ContentWrapper);
Vue.use(http);
Vue.use(helper);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
