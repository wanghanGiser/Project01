<template>
  <div id="chart">
    这是chart路由组件
  </div>
</template>

<script>
export default {

}
</script>

<style>
#chart {
  float: left;
  height: 100vh;
}
@media screen and (max-width: 768px) {
  #chart {
    width: 100vw;
  }
}
@media screen and (min-width: 769px) {
  #chart {
    width: calc(100vw - 200px);
  }
}
@media screen and (min-width: 993px) {
  #chart {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 1201px) {
  #chart {
    width: calc(100vw - 300px);
  }
}
</style>