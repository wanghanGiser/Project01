import Vue from "vue"
import Vuex from "vuex"
import $ajax from "@/network/request.js"

Vue.use(Vuex)
const store={
  state:{
    userID:null,
    isLogin:false,
    cata:"scenic",
    menuShow:false,
    pageNum:1,
    overLay:{},
    scenic_list:[],
    activePoint:"",
    position:"",
    info: {
      title: "",
      ischecked:false,
      description:"",
      image:""
    }
  },
  getters:{
    pageCount(state){
      return state.cata=="scenic"?19:14
    }
  },
  mutations:{
    setInfo(state,res){
      state.info.title=res.name_cn;
      state.info.description=res.description;
      state.info.image=res.default_photo;
      state.info.ischecked=res.ischecked!="0"?true:false
    },
    setIsCheched(state){
      state.info.ischecked=true
    },
    setLocation(state,loca){
      state.position=loca
    },
    setPosition(state,posi){
      state.activePoint=posi
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