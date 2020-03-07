<template>
  <div id="menu-list" :style="showMenu" @click.stop>
    <div id="buffer">
      <tab-button @childEmit="menuList()" v-show="!$store.state.menuShow" />
      <menu-header>
        <div style="display:flex;align-items:center">
          <user-image @click.native="exit()" />
          <div v-show="$store.state.isLogin">
            <a href="javascript:void(0);" @click="logReg(true)">登录</a> /
            <a href="javascript:void(0);" @click="logReg(false)">注册</a>
          </div>
          <a href="javascript:void(0);" v-show="$store.state.isLogin">{{username}}</a>
        </div>
        <image-btn :title="'收藏夹'" :imgURL="require('@/assets/favorites.png')" />
      </menu-header>
      <list-box @itemClick="itemClick()" />
    </div>
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
  props: {
    username: {
      type: String,
      default: ""
    }
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
      this.$store.commit("setMenuShow");
    },
    exit() {
      localStorage.removeItem("token");
      this.$store.commit("setLogStatus");
    },
    logReg(bool) {
      this.$emit("toLogReg", bool);
    },
    itemClick() {
      this.$store.commit("setMenuShow");
    }
  },
  computed: {
    showMenu() {
      return {
        left: this.$store.state.menuShow ? "0" : "-300px"
      };
    }
  },
  mounted() {}
};
</script>

<style scoped>
#menu-list {
  transition: left 0.4s ease-in-out;
  height: 100vh;
  float: left;
  color: #747d8c;
  background-color: #f1f2f6;
  box-shadow: 0 0 3px #000;
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
    width: 300px;
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
  color: #0984e3;
}
a:active {
  color: #e84118;
}
</style>