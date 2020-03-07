<template>
  <div id="user-image" :style="{backgroundImage:image}">
  </div>
</template>

<script>
let hello=require("@/assets/unlogin.png")
export default {
  data(){
    return{
      image:"url("+hello+")"
    }
  }
};
</script>

<style scoped>
#user-image {
  width: 3em;
  height: 3em;
  margin-right: 3px;
  box-sizing: border-box;
  border-radius: 1.5em;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
#user-image:hover {
  box-shadow: 0 0 2px #000
}
img{
  width: 3em;
  height: 3em;
}
</style>