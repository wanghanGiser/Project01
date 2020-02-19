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
      console.log(typeof Promise);
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
