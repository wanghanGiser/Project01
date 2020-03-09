<template>
  <div id="user-info">
    这是用户信息
  </div>
</template>

<script>
export default {

}
</script>

<style>
#user-info {
  float: left;
  height: 100vh;
   transition: .5s all ease-in-out;
}
@media screen and (max-width: 768px) {
  #user-info {
    width: 100vw;
  }
}
@media screen and (min-width: 769px) {
  #user-info {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 993px) {
  #user-info {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 1201px) {
  #user-info {
    width: calc(100vw - 300px);
  }
}
</style>