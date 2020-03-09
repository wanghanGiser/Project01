<template>
  <div id="user-image" :style="{backgroundImage:image}" @click.stop="open()">
    <div id="userOpt" v-show="isShow&&$store.state.isLogin">
      <ul>
        <li @click.stop="toUserInfo()">修改信息</li>
        <li @click.stop="exit()">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
let hello = require("@/assets/unlogin.png");
export default {
  props:{
    isShow: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      image: "url(" + hello + ")",
    };
  },
  methods: {
    open() {
      this.isShow = !this.isShow;
    },
    exit() {
      localStorage.removeItem("token");
      this.$store.commit("setLogStatus");
    },
    toUserInfo() {
      this.$emit("itemClick");
      if (this.$route.path != "/userinfo") {
        this.$router.push("/userinfo");
      }
    }
  },
  mounted() {
    document.body.addEventListener("click", () => {
      if (this.isShow) this.isShow = false;
    });
  }
};
</script>

<style scoped>
#user-image {
  width: 3em;
  height: 3em;
  margin-right: 3px;
  box-sizing: border-box;
  border-radius: 1.5em;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
img {
  width: 3em;
  height: 3em;
}
#userOpt {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0;
  z-index: 2;
}
#userOpt > ul {
  list-style: none;
  background-color: rgb(124, 124, 52);
  width: 6em;
  color: aliceblue;
  cursor: default;
}
#userOpt > ul > li {
}
#userOpt > ul > li:hover {
  background-color: aqua;
}
</style>