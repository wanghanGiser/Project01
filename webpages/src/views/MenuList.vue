<template>
  <div id="menu-list" :style="showMenu">
    <menu-header/>
    <div style="height:0px;position:relative">
      <div class="tab-button" @click="menuList()" />
    </div>
  </div>
</template>

<script>
import MenuHeader from "@/components/MenuHeader";
export default {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    MenuHeader
  },
  methods: {
    menuList() {
      this.isShow = !this.isShow;
    }
  },
  computed: {
    showMenu() {
      return {
        left: this.isShow ? "0" : "-300px"
      };
    }
  }
};
</script>

<style>
#menu-list {
  transition: all 0.3s ease-in-out;
  height: 100vh;
  float: left;
  background-color: blue;
}
.tab-button {
  display: none;
}
@media all and (max-width: 768px) {
  #menu-list {
    width: 300px;
    background-color: rgb(53, 110, 160);
    position: absolute;
    z-index: 2;
    left: -300px;
  }
  .tab-button {
    width: 20px;
    height: 30px;
    background-color: #ccc;
    display: block;
    position: absolute;
    right: -20px;
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

.active {
  color: red;
}
</style>