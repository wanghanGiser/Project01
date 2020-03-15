<template>
  <div id="jump-to">
    <div class="item" @click="on_off()" :style="{backgroundImage:image}"></div>
    <div class="item" @click="jump()" style="display: none;height: 0em;transition:height .1s ease-in-out" />
    <div class="item" id="heat-map" style="display: none;height: 0em;transition:height .1s ease-in-out" />
    <div class="item" id="locate" style="display: none;height: 0em;transition:height .1s ease-in-out" />
  </div>
</template>

<script>
let zhankai = "url(" + require("@/assets/zhankai.png") + ")";
let zhedie = "url(" + require("@/assets/zhedie.png") + ")";
export default {
  data() {
    return {
      image: zhankai
    };
  },
  mounted() {},
  methods: {
    jump(){
      this.on_off();
      this.$router.push({path:this.$route.path=="/"?"/chart":"/"})
    },
    on_off() {
      let items = document.getElementsByClassName("item");
      if (this.image == zhankai) {
        for (let i = 1; i < items.length; i++) {
          items[i].style.display = "block";
          setTimeout(() => {
            items[i].style.height = "1.375em";
          }, 100 * i);
        }
        this.image = zhedie;
      } else {
        setTimeout(() => {
          for (let i = 1; i < items.length; i++) {
            items[i].style.display = "none";
          }
        }, 400);
        for (let i = 1; i < items.length; i++) {
          setTimeout(() => {
            items[i].style.height = "0em";
          }, 100*Math.abs(i-4));
        }
        this.image = zhankai;
      }
    }
  }
};
</script>

<style scoped>
#jump-to {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  padding: 2px;
  z-index: 0;
  bottom: 0em;
  right: 0em;
  display: flex;
  flex-direction: column-reverse;
}
@media all and (max-width: 768px) {
  #jump-to {
    font-size: 24px;
  }
}
.item {
  border-radius: 2px;
  display: block;
  margin: 1px;
  padding: 0;
  color: white;
  font-size: 1.14em;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  width: 1.375em;
  height: 1.375em;
  line-height: 0.4em;
  background-color: rgba(0, 60, 136, 0.5);
  border: none;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
}
.item:hover {
  background-color: rgba(0, 60, 136, 0.7);
}
</style>