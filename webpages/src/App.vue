<template>
  <div id="app">
    <container :isShow="isShow">
      <div style="width:200px;height:200px;background-color:#ccc;">
        <close-bar @closeEvent="show()"/>
      </div>
    </container>
    <menu-list />
    <router-view />
  </div>
</template>
<script>
import MenuList from "@/views/MenuList";
import Container from "@/components/common/Container.vue";
import CloseBar from "@/components/common/CloseBar.vue";

export default {
  data() {
    return {
      isShow:true
    };
  },
  components: {
    MenuList,Container,CloseBar
  },
  methods:{
    show(){
      this.isShow=!this.isShow
    }
  },
  mounted() {
    this.$request
      .get("/demo.txt")
      .then(res => {
        this.msg = res.data;
      })
      .catch(err => {
        this.msg = "请求失败" + err;
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
