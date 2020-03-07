<template>
  <div id="container"  @click.stop>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
#container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 100;
  line-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>