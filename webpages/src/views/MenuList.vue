<template>
  <div id="menu-list" :style="showMenu">
    <tab-button @childEmit="menuList()" />
    <menu-header>
      <div style="display:flex;align-items:center">
        <user-image />&nbsp;
        <div>
          <a href="javascript:void(0);" @click="logReg(true)">登录</a>/
          <a href="javascript:void(0);" @click="logReg(false)">注册</a>
        </div>
      </div>
      <image-btn :title="'收藏夹'" :imgURL="require('@/assets/favorites.png')" />
    </menu-header>
    <list-box />
  </div>
</template>

<script>
import UserImage from "@/components/common/user/UserImage.vue";
import MenuHeader from "@/components/MenuHeader";
import TabButton from "@/components/common/TabButton";
import ListBox from "@/components/ListBox";
import ImageBtn from "@/components/common/ImageBtn.vue";
export default {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    MenuHeader,
    TabButton,
    ListBox,
    UserImage,
    ImageBtn
  },
  methods: {
    menuList() {
      this.isShow = !this.isShow;
    },
    logReg(bool){    
      this.$emit("toLogReg",bool)
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

<style scop>
#menu-list {
  transition: all 0.3s ease-in-out;
  height: 100vh;
  float: left;
  color: #f8efba;
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
a {
  text-decoration: underline;
  color: #f5f6fa;
}
a:active {
  color: #e84118;
}
</style>