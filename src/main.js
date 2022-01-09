import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueLodash from 'vue-lodash'
import lodash from 'lodash'
Vue.use(VueLodash, {
  name: 'custom',
  lodash: lodash
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
