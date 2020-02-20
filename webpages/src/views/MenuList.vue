<template>
  <div id="menu-list">
    <router-link to="/" :class="exam1" exact>map</router-link>
    <router-link to="/chart" :class="exam1">chart</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exam1: "exam1"
    };
  }
};
</script>

<style>
#menu-list {
  height: 100vh;
  float: left;
  background-color: blue
}

@media all and (max-width: 768px) {
  #menu-list {
    width: 300px;
    background-color: aliceblue;
    position: absolute;
    z-index: 2;
    left: -100%;
  }
}
@media all and (min-width: 768px) and (max-width: 992px) {
  #menu-list {
    width: 200px;
    background-color: antiquewhite;
  }
}
@media all and (min-width: 992px) and (max-width: 1200px) {
  #menu-list {
    width: 300px;
    background-color: aqua;
  }
}
@media all and (min-width: 1200px) {
  #menu-list {
    width: 300px;
    background-color: aquamarine;
  }
}
.exam1 {
  text-decoration: none;
  padding: 5px;
}
.active {
  color: red;
}
</style>