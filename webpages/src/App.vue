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
*{
  padding: 0;
  margin: 0;
}
html,body{
  font-size: 18px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

</style>
