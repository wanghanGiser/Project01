<template>
  <div id="menu-list">
    <router-link to="/" :class="exam1" active-class="active">map</router-link>
    <router-link to="/Chart" :class="exam1" active-class="active">chart</router-link>
  </div>
</template>

<script>
export default {

};
</script>

<style>
#menu-list {
  background-color: aqua;
}
.exam1{
  text-decoration: none;
  display:inline-block;
  padding: 3px;
}
.active{
  color: red
}
</style>