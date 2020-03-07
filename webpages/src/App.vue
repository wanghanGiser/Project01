<template>
  <div id="app">
    <container v-if="isShow">
      <login-reg @close="close()" :isReg="isReg" @submit="logOrReg(arguments)"/>
    </container>
    <v-touch v-on:swipeleft="onSwipeLeft">
      <menu-list @toLogReg="toLogReg($event)" :username="username"/>
    </v-touch> 
    <div style="float:left">
      <router-view />
      <jump-to />
    </div>
  </div>
</template>
<script>
import MenuList from "@/views/MenuList";
import Container from "@/components/common/Container.vue";
import JumpTo from "@/components/JumpTo.vue";
import LoginReg from "@/components/common/LoginReg.vue";
export default {
  data() {
    return {
      isShow: false,
      isReg: false,
      username:""
    };
  },
  components: {
    MenuList,
    Container,
    JumpTo,
    LoginReg
  },
  methods: {
    close() {
      this.isShow = !this.isShow;
    },
    toLogReg(bool) {
      this.isReg = bool ? false : true;
      this.isShow = true;
    },
    logOrReg(args) {
      if (args[0]) {
        this.$ajax
          .post("/user/reg", {
            name: args[1].username,
            pwd: args[1].password
          })
          .then(res => {
            console.log(res.data);
          });
      } else {
        this.$ajax
          .post("/user/login", {
            name: args[1].username,
            pwd: args[1].password
          })
          .then(res => {
            if (res.data.token && res.data.token != "") {
              localStorage.setItem("token", res.data.token);
              this.$store.commit("setLogStatus");
              this.username=args[1].username;
              this.isShow = !this.isShow;
            }
          });
      }
    },
    onSwipeLeft(){
      this.$store.commit("setMenuShow");
    }
  },
  mounted() {
    this.$store.state.isLogin = localStorage.getItem("token") == null;
    document.body.addEventListener("click", () => {      
      if (this.$store.state.menuShow) {
        this.$store.commit("setMenuShow");
      }
    });
  }
};
</script>
<style>
@import url("./views/css/common.css");
#app {
  width: 100vw;
  height: 100vh;
}
.active {
  color: red;
}
</style>
