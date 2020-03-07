<template>
  <div id="tab-button"  title="展开">
    <div class="tab-button" :style="{backgroundImage:image}" @click="emitParent()" />
  </div>
</template>

<script>
export default {
  data(){
    return{
      image:"url("+require("@/assets/open.png")+")"
    }
  },
  methods: {
    emitParent() {
      this.$emit("childEmit");
    }
  }
};
</script>

<style>
#tab-button {
  height: 0px;
  position: relative;
}
.tab-button {
  display: none;
  background-color: #27ae60;
  border-radius: 0 2px 2px 0;
  box-sizing: border-box;
  background-size: 100% 50%;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.3s all ease-in-out;
}

.tab-button:hover {
  box-shadow: 0 0 5px black;
}
@media all and (max-width: 768px) {
  .tab-button {
    width: 1.5em;
    height: 4em;
    display: block;
    position: absolute;
    right: -1.5em;
    top: calc(50vh - 2em);
  }
  
}
</style>