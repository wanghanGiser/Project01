/**
 * 封装axios
 * by王涵
 */

 import axios from 'axios'

 const instance=axios.create({
   baseURL:"/api"
 })
 export default instance