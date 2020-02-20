<template>
  <div id="map">这是map路由组件</div>
</template>

<script>
export default {};
</script>

<style>
#map {
  float: left;
  height: 100vh;
}
@media screen and (max-width: 768px) {
  #map {
    width: 100vw;
  }
}
@media screen and (min-width: 768px) {
  #map {
    width: calc(100vw - 200px);
  }
}
@media screen and (min-width: 992px) {
  #map {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 1200px) {
  #map {
    width: calc(100vw - 300px);
  }
}
</style>