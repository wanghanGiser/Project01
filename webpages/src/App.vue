<template>
  <div id="app">
    <Loading/>
    <container v-if="isShow">
      <login-reg @close="close()" :isReg="isReg" @submit="logOrReg(arguments)" />
    </container>
    <v-touch v-on:swipeleft="onSwipeLeft">
      <menu-list @toLogReg="toLogReg($event)" :username="username" :image="image" />
    </v-touch>
    <div style="float:left">
      <keep-alive>
        <router-view :image="image" @changeinfo="changeinfo($event)" />
      </keep-alive>
      <jump-to />
    </div>
  </div>
</template>
<script>
import MenuList from "@/views/MenuList";
import Container from "@/components/common/Container.vue";
import JumpTo from "@/components/JumpTo.vue";
import Loading from "@/components/common/loading.vue";
import LoginReg from "@/components/common/LoginReg.vue";
const unlogin = require("@/assets/unlogin.png");
export default {
  data() {
    return {
      isShow: false,
      isReg: false,
      username: "",
      image: unlogin
    };
  },
  components: {
    MenuList,
    Container,
    JumpTo,
    LoginReg,
    Loading
  },
  methods: {
    close() {
      this.isShow = !this.isShow;
    },
    toLogReg(bool) {
      this.isReg = bool ? false : true;
      this.isShow = true;
    },
    changeinfo(info) {
      if(info.img){
        this.image = info.img;
      }
      if(info.text){
        this.username=info.text
      }
    },
    logOrReg(args) {
      if (args[0]) {
        this.$ajax
          .post("/user/reg", {
            name: args[1].username,
            pwd: args[1].password
          })
          .then(res => {
            if(res.data.status){
              this.isShow = !this.isShow;  
            }else{
              alert("用户名已存在")
            }
          });
        return;
      }
      this.$ajax
        .post("/user/login", {
          name: args[1].username,
          pwd: args[1].password
        })
        .then(res => {
          if (res.data.token && res.data.token != "") {
            this.isShow = !this.isShow;
          }else{
            alert("登陆失败")
          }
        });
    },
    onSwipeLeft() {
      this.$store.commit("setMenuShow");
    }
  },
  watch: {
    "$store.state.isLogin"(newValue) {
      if (!newValue) {
        this.image = unlogin;
      } else {
        this.$ajax.get("/user/info").then(res => {
          if (this.$store.state.isLogin) this.username = res.data.name;
          if (res.data.pic) this.image = "/upload/" + res.data.pic;
        });
      }
    }
  },
  mounted() {
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
