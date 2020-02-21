<template>
  <div id="menu-header">
    <a @click="jumpTo()">{{tagName}}</a>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tagName:"统计数据"
    }
  },
  methods:{
    jumpTo(){
      switch (this.$route.path) {
        case "/":
          this.$router.push({path:"/chart"})
          this.tagName="回到地图"
          break;
      
        default:
          this.$router.push({path:"/"})
          this.tagName="统计数据"
          break;
      }
    }
  },
  
};
</script>

<style>
#menu-header{
  height: 2em;
  background-color: blueviolet;
  line-height: 2em;
}
a:hover{
  text-decoration: tomato underline
}
.exam1 {
  text-decoration: none;
  padding: 5px;
}
</style>