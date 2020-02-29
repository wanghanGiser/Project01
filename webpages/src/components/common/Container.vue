<template>
  <div id="container" v-show="isShow">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    isShow:Boolean
  }
};
</script>

<style>
#container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 100;
  line-height: 100vh;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center;
}
</style>