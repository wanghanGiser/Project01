<template>
  <div id="mainLog">
    <close-bar @click.native="close()"/>
    <div id="log-reg">
      <input type="text" placeholder="用户名" v-model="username"/>
      <input type="password" placeholder="密码" v-model="password"/>
      <input type="password" v-show="isReg" placeholder="再次输入" v-model="password2"/>
      <input type="submit" :value="btnName" />
    </div>
  </div>
</template>
<script>
import CloseBar from "@/components/common/CloseBar.vue";

export default {
  components: { CloseBar },
  props: {
    isReg: {
      type: Boolean,
      required:true,
      default: false
    }
  },
  data() {
    return {
      username:"",
      password:"",
      password2:"",
    }
  },
  computed:{
    btnName(){
      return this.isReg ? "注册" : "登录"
    }
  },
  methods: {
    close() {
      this.username="";
      this.password="";
      this.password2="";
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
#mainLog {
  background-color: #dcdde1;
  box-shadow: 0 0 10px black
}
#log-reg {
  width: 400px;
  height: 300px;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
@media all and (max-width: 768px){
  #log-reg{
    width:90vw;
  }
}
input {
  color: #718093;
  width: 70%;
  height: 2.8em;
  box-sizing: border-box;
  outline: none;
  text-align: center;
  border-radius: 1.4em;
  border: none
}
input[type="submit"]{
   color: #f5f6fa;
  background-color: #00a8ff;
  cursor: pointer;
}
input[type="text"]:focus,input[type="password"]:focus{
  
  box-shadow: 0 0 3px black
}
input[type="submit"]:hover{
  box-shadow: 0 0 4px black
}
</style>