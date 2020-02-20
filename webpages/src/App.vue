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
html,body{
  padding: 0;
  margin: 0;
  font-size: 18px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
#router-view{
  flex: 5
}
@media screen and (max-width: 768){
  
}
@media screen and (min-width: 768){
  
}
@media screen and (min-width: 992){
  
}
@media screen and (min-width: 1200){
  
}
.exam1{

}
.exam2{

}
</style>
