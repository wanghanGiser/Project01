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
  box-sizing: border-box;
  border-radius: 1.5em;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center
}
#user-image:hover {
  border: 1.5px solid #778ca3;
}
img{
  width: 3em;
  height: 3em;
}
</style>