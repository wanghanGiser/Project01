<template>
  <div id="user-image" :style="{backgroundImage:'url(' +image+')'}">
    <div id="userOpt" v-show="$store.state.isLogin">
      <ul>
        <li @click="toUserInfo()">修改信息</li>
        <li @click="exit()">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    image:{
      type:String
    }
  },
  methods: {
    exit() {
      if (this.$route.path !== "/" && this.$route.path !== "/chart")
        this.$router.push({ path: "/" });
      localStorage.removeItem("token");
      this.$store.commit("setLogStatus");
    },
    toUserInfo() {
      this.$emit("itemClick");
      if (this.$route.path != "/userinfo") {
        this.$router.push("/userinfo");
      }
    }
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
  background-color: #fff;
  display: none;
  width: 6em;
  color: aliceblue;
  cursor: default;
  border: 1px solid #ccc;
}
#user-image:hover > div > ul {
  display: block;
}
#userOpt > ul > li {
  padding: 2px;
  text-align: center;
  color: #778ca3;
}
#userOpt > ul > li:hover {
  background-color: #45aaf2;
  color:#fff
}
</style>