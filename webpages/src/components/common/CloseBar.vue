<template>
  <div id="closeBar">
    <div class="close" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#closeBar {
  width: 100%;
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
  box-shadow: 1px 1px 2px rgb(51, 49, 49);
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