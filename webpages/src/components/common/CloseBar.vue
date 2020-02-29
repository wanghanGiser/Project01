<template>
  <div id="closeBar" @click="btnC()">
    <div class="close"/>
  </div>
</template>

<script>
export default {
  methods: {
    btnC() {
      this.$emit("closeEvent");
    }
  }
};
</script>

<style scoped>
#closeBar {
  height: 0;
  position: relative;
}
.close {
  position: absolute;
  right: -13px;
  top: -13px;
  width: 26px;
  height: 26px;
  background: silver;
  border-radius: 15px;
  box-shadow: 0px .5px .5px .5px black;
  cursor: pointer;
}

.close:hover {
  background: red;
}
.close:before {
  position: absolute;
  content: "";
  width: 18px;
  height: 5px;
  background: white;
  transform: rotate(45deg);
  top: 10.5px;
  left: 4px;
}
.close:after {
  content: "";
  position: absolute;
  width: 18px;
  height: 5px;
  background: white;
  transform: rotate(-45deg);
  top: 10.5px;
  left: 4px;
}
</style>