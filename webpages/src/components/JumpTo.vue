<template>
  <div id="jump-to" >
    <div class="item" style="height: 1.375em;" @click="on_off()">+</div>
    <div class="item" />
    <div class="item" />
    <div class="item" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted(){
    let items=document.getElementsByClassName("item");
    let size=items.length;
    for(let i=1; i<size;i++){
      items[i].style.transition="all "+i*0.1+"s "+"ease-out "+(i-1)*0.1+"s";
    }
  },
  methods: {
    on_off(){
      let items=document.getElementsByClassName("item");
      for(let i=1;i<items.length;i++){
        items[i].style.height=items[i].style.height=="0em"?"1.375em":"0em";
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
  bottom:.5em;
  right: .5em;
  display: flex;
  flex-direction: column-reverse;
  
}
.item {
  display: block;
  margin: 1px;
  padding: 0;
  color: white;
  font-size: 1.14em;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  
  width: 1.375em;
  line-height: 0.4em;
  background-color: rgba(0, 60, 136, 0.5);
  border: none;
  background-position: center;
  background-size:60%;
  background-repeat: no-repeat;
  
}
.item:hover{
  background-color: rgba(0, 60, 136, 0.7);
}
</style>