<template>
  <div id="btn" :title="title" :style="{backgroundImage:image,width:width,height:height}">
    
  </div>
</template>

<script>
export default {
  props:{
    imgURL:{
      type:String,
      default:"",
      required:true
    },
    width:{
      type:String,
      default:"1.5em"
    },
    height:{
      type:String,
      default:"1.5em"
    },
    title:{
      type:String,
      default:""
    }
  },
  data(){
    return{
      image:"url("+this.imgURL+")"
    }
  }
}
</script>

<style scoped>
#btn{
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}

</style>