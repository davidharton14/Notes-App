import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { mdiAccountChildOutline } from "@mdi/js";
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  mdiAccountChildOutline,
  render: (h) => h(App),
}).$mount("#app");