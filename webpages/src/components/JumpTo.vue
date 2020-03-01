<template>
  <div id="jump-to">
    <label for="isChart" :title="msg">
      <input type="checkbox" id="isChart"/>
      <a id="jump" @click="jumpTo()" :style="{backgroundImage:image}"></a>
    </label>
    
  </div>
</template>

<script>
let tochart=require("@/assets/tochart.png");
export default {
  data(){
    return{
      image:"url("+tochart+")",
      msg:"显示图表"
    }
  },
  methods:{
    jumpTo(){
      switch (this.$route.path) {
        case "/":
          this.$router.push({path:"/chart"});
          this.msg="显示地图"
          break;
      
        default:
          this.$router.push({path:"/"})
          this.msg="显示图表"
          break;
      }
    }
  }
}
</script>

<style scoped>
#jump-to{
  height: 0;
  position: relative;
}
#jump{
  height: 2.5em;
  width: 2.5em;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border-radius: 50%;
  background-position: center;
  background-size: 80% 80%;
  background-repeat: no-repeat;
  background-color: #d2dae2
}
input{
  display: none
}
#isChart:checked+#jump{
  border: 4px solid #808e9b;
}

</style>