import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import VueLodash from "vue-lodash";
import lodash from "lodash";
import i18n from './i18n'
Vue.use(VueLodash, {
  name: "custom",
  lodash: lodash,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
