import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '@/views/Map'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    component: Map
  },
  {
    path: "/chart",
    component: () => import("@/views/Chart.vue")
  }
]

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active"
})

export default router