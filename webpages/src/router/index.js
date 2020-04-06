import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '@/views/Map'
Vue.use(VueRouter)

const routes = [{
    name: "map",
    path: "/",
    component: Map,
  },
  {
    name: "chart",
    path: "/chart",
    component: () => import("@/views/Chart.vue"),
    beforeEnter: (to, from, next) => {
      if (!from.name) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    name: "favorites",
    path: "/favorites",
    component: () => import("@/views/favorites.vue"),
    beforeEnter: (to, from, next) => {
      if (!from.name) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    name: "userinfo",
    path: "/userinfo",
    component: () => import("@/views/userInfo.vue"),
    beforeEnter: (to, from, next) => {
      if (!from.name) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    name: "404",
    path: "*",
    beforeEnter: (to, from, next) => {
      next('/')
    }
  }
]
const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active"
})
export default router