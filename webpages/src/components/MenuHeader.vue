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
  align-items: center;
  justify-content: space-around;
  background-color: #45aaf2;
}
</style>