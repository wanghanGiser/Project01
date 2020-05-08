/**
 * 封装axios
 * by王涵
 */
import axios from 'axios'
import store from "@/store/store"
import vm from "@/main.js"

const instance = axios.create({
  baseURL: "/api"
})
let count = 0
instance.interceptors.request.use(function (config) {
  count++
  store.commit("setRun",count);
  if (localStorage.getItem("token"))
    config.headers['Authorization'] = localStorage.getItem("token");
  return config;
}, function (error) {
  count--
  store.commit("setRun",count);
  alert(error)
  return Promise.reject(error);
});
instance.interceptors.response.use(res => {
  vm.$nextTick(() => {
    count--
    store.commit("setRun",count);
  })
  if (!res.headers.token) {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
    }
    store.commit("setLogStatus");
    return res;
  }
  localStorage.setItem("token", res.headers.token);
  store.commit("setLogStatus");
  return res;
}, err => {
  
  count--
  store.commit("setRun",count);
  alert(err)
  return Promise.reject(err)
})
export default instance