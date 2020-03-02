import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
const store={
  state:{
    isLogin:false
  },
  getters:{
    getLogStatus(state){
      return state.isLogin
    }
  },
  mutations:{
    setLogStatus(state){
      state.isLogin=!state.isLogin
    }
  },
  actions:{
    
  }
}
export default new Vuex.Store(store)