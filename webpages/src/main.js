import Vue from 'vue'
import App from './App.vue'
import router from './router'
import instance from './network/request'
import store from './store/store'

Vue.config.productionTip = false
Vue.prototype.$ajax=instance


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
