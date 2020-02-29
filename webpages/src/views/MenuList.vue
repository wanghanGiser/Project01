<template>
  <div id="menu-list" :style="showMenu">
    <menu-header/>
    <tab-button @childEmit="menuList()"/>
    <list-box/>
  </div>
</template>

<script>
import MenuHeader from "@/components/MenuHeader";
import TabButton from "@/components/common/TabButton";
import ListBox from "@/components/ListBox";
export default {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    MenuHeader,
    TabButton,
    ListBox
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
  color: #F8EFBA;
  background-color: #227093;
}

@media all and (max-width: 768px) {
  #menu-list {
    width: 300px;
    position: absolute;
    z-index: 2;
    left: -300px;
  }
}
@media all and (min-width: 769px) and (max-width: 992px) {
  #menu-list {
    width: 200px;
  }
}
@media all and (min-width: 993px) and (max-width: 1200px) {
  #menu-list {
    width: 300px;
  }
}
@media all and (min-width: 1201px) {
  #menu-list {
    width: 300px;
  }
}


</style>