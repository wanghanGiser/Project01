<template>
  <div id="tab-button">
    <div class="tab-button" @click="emitParent()" />
  </div>
</template>

<script>
export default {
  methods:{
    emitParent(){
      this.$emit("childEmit");
    }
  }
};
</script>

<style>
#tab-button{
  height:0px;position:relative
}
.tab-button {
  display: none;
  background-color: #33d9b2;
  border-radius: 0 50% 50% 0;
  box-sizing: border-box
}
.tab-button:hover{
  box-shadow:0 0 5px black
}
@media all and (max-width: 768px) {
  .tab-button {
    width: 20px;
    height: 8em;
    display: block;
    position: absolute;
    right: -20px;
    top: calc(50vh - 4em)
  }
}
</style>