<template>
  <div id="menu-header">
    <slot></slot>
  </div>
</template>
<script>


export default {
  data(){
    return{
      tagName:"统计数据"
    }
  },
  methods:{
  },
  components:{
   
  }
};
</script>

<style>
#menu-header{
  display: flex;
  flex-direction: row;
  height: 4em;
  box-shadow: 0 0 2px #000;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-bottom: .2px solid #dfe4ea
}
</style>