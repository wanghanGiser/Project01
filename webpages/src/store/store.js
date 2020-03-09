import Vue from "vue"
import Vuex from "vuex"
import $ajax from "@/network/request.js"

Vue.use(Vuex)
const store={
  state:{
    isLogin:false,
    cata:"scenic",
    menuShow:false,
    pageNum:1,
    overLay:{},
    scenic_list:[],
    activePoint:"",
    position:"118.3506988, 35.3032403"
  },
  getters:{
    pageCount(state){
      return state.cata=="scenic"?19:14
    }
  },
  mutations:{
    setPosition(state,posi){
      state.activePoint=posi
    },
    setLocal(state,posi){
      state.position=posi
    },
    setOverLay(state,overLay){
      state.overLay=overLay
    },
    setLogStatus(state){
      state.isLogin=localStorage.getItem("token")?true:false
    },
    setCata(state,optS){
      state.cata=optS
    },
    setMenuShow(state){
      state.menuShow=!state.menuShow
    },
    setPageNum(state,num){
      state.pageNum+=(num==1?(state.pageNum<(state.cata=="scenic"?19:14)?1:0):(state.pageNum>1?-1:0))
    },
    changeNum(state,num){
      num=(typeof num=="string")?num.trim()*1:num
      state.pageNum=num
    },
    changeList(state,newArr){
      state.scenic_list=newArr
    }
  },
  actions:{
    getSinceList(context){
      $ajax
        .post(context.state.cata=="scenic"?"/scenic/scenic_list_limit":"/rest/rest_list_limit", {
          num: context.state.pageNum
        })
        .then(res => {
          context.commit("changeList",res.data);
        }).catch(()=>{
        });
    }
  }
}
export default new Vuex.Store(store)