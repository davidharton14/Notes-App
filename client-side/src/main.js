import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import drag from "v-drag"
Vue.use(drag);
import { mdiAccountChildOutline } from "@mdi/js";
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  mdiAccountChildOutline,
  render: (h) => h(App),
}).$mount("#app");
