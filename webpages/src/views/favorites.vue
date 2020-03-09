<template>
  <div id="favo">
    这是收藏夹
  </div>
</template>

<script>
export default {

}
</script>

<style>
#favo {
  float: left;
  height: 100vh;
   transition: .5s all ease-in-out;
}
@media screen and (max-width: 768px) {
  #favo {
    width: 100vw;
  }
}
@media screen and (min-width: 769px) {
  #favo {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 993px) {
  #favo {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 1201px) {
  #favo {
    width: calc(100vw - 300px);
  }
}
</style>