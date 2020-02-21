<template>
  <div id="ListBox">
     <list-item v-for="item in [1,2,3,4,5,6]" :index="item" :key="item"/>
  </div>
</template>

<script>
import ListItem from "@/components/common/ListItem";
export default {
  data(){
    return{
      
    }
  },
  components:{
    ListItem
  }
}
</script>

<style>

</style>