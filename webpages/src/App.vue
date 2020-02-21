<template>
  <div id="app">
    <menu-list/>
    <router-view/>
  </div>
</template>
<script>
import MenuList from "@/views/MenuList"
export default {
  data(){
    return{
      msg:""
    }
  },
  components:{
    MenuList
  },
  mounted(){
    this.$request.get(
      "/demo.txt"
    ).then(res=>{
      this.msg=res.data;
    }).catch(err=>{
      this.msg="请求失败"+err
    })
  }
}
</script>
<style>
@import url("./views/css/common.css");
#app {
  width: 100vw;
  height: 100vh;
}
.active {
  color: red;
}
</style>
