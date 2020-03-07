<template>
  <div>
    <h1>{{title}}</h1>
    <p>{{description}}</p>
    <img :src="image">
  </div>
</template>

<script>
export default {
  props:{
    
    title:{
      type:String,
      default:""
    },
    description:{
      type:String,
      default:""
    },
    image:{
      type:String,
      default:""
    }
  }
}
</script>

<style scoped>
img{
  height: auto;
  width: 100%;
}
</style>