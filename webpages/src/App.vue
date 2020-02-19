<template>
  <div id="app">
    {{msg}}
  </div>
</template>
<script>
export default {
  data(){
    return{
      msg:""
    }
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
