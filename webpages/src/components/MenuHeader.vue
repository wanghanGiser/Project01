<template>
  <div id="menu-header">
    <router-link to="/" class="exam1" exact>map</router-link>
    <router-link to="/chart" class="exam1">chart</router-link>
    <a @click="jumpTo()">跳转</a>
  </div>
</template>

<script>
export default {
  methods:{
    jumpTo(){
      switch (this.$route.path) {
        case "/":
          this.$router.push({path:"/chart"})
          break;
      
        default:
          this.$router.push({path:"/"})
          break;
      }
    }
  }
};
</script>

<style>
#menu-header{
  height: 2em;
  background-color: blueviolet;
  line-height: 2em;
}
.exam1 {
  text-decoration: none;
  padding: 5px;
}
</style>