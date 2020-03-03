/**
 * 封装axios
 * by王涵
 */

 import axios from 'axios'

 const instance=axios.create({
   baseURL:"/api"
 })
 instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(localStorage.getItem("token"))
  config.headers['Authorization'] = localStorage.getItem("token");
  return config;
  //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

 export default instance