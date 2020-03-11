/**
 * 封装axios
 * by王涵
 */
import axios from 'axios'

import store from "@/store/store"
const instance = axios.create({
  baseURL: "/api"
})
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.getItem("token"))
    config.headers['Authorization'] = localStorage.getItem("token");
  return config;
}, function (error) {
  return Promise.reject(error);
});
instance.interceptors.response.use(res => {  
  if (!res.headers.token) {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
    }
    store.commit("setLogStatus");
    return res;
  }
  localStorage.setItem("token",res.headers.token);
  store.commit("setLogStatus");
  return res;
}, err => {
  return Promise.reject(err)
})
export default instance