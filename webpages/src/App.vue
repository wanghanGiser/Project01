<template>
  <div id="app">
    <container v-if="isShow" @click="show()">
      <login-reg @close="close()" :isReg="isReg" />
    </container>
    <menu-list @toLogReg="toLogReg($event)" />
    <div style="float:left">
      <jump-to />
      <router-view />
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
      isShow: true,
      isReg: false
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
    }
  },
  mounted() {}
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
