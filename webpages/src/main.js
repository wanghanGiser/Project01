import Vue from 'vue'
import App from './App.vue'
import router from './router'
import instance from './network/request'

Vue.config.productionTip = false
Vue.prototype.$ajax=instance


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
