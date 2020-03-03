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
  height: 2.2em;
  width: 2.2em;
  display: block;
  position: absolute;
  top: 3px;
  right: 3px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2.5px solid #1e90ff;
  background-position: center;
  background-size: 80% 80%;
  background-repeat: no-repeat;
  background-color: #ffffff;
  transition: .2s all ease-in-out
}
input{
  display: none
}
#isChart:checked+#jump{
  border: 6px solid #1e90ff;

}
#jump:hover{
  box-shadow: 0 0 3px #000
}

</style>