import Vue from 'vue'
import App from './App.vue'
import router from './router'
import instance from './network/request'
import store from './store/store'
import VueTouch from 'vue-touch'

Vue.config.productionTip = false
Vue.prototype.$ajax=instance
Vue.use(VueTouch, {name: 'v-touch'})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
