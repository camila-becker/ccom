import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from "vue-sweetalert2";
import VueTheMask from "vue-the-mask";
import money from "v-money";
import store from "./store";
import router from "./router";

import FormatarData from "./filters/date";

import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(VueTheMask);
Vue.use(money);

Vue.filter("data", FormatarData);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
