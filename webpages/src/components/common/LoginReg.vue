<template>
  <div id="mainLog">
    <close-bar @click.native="close()" />
    <div id="log-reg">
      <input type="text" placeholder="用户名" v-model.trim.lazy="username" @keyup.13="goDown()"/>
      <input type="password" placeholder="密码" v-model.trim.lazy="password" @keyup.13="submit()"/>
      <input type="password" v-show="isReg" placeholder="再次输入" v-model.trim.lazy="password2" @keyup.13="submit()"/>
      <input type="submit" :value="btnName"  @click="submit()" />
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
      required: true,
      default: false
    }
  },
  data() {
    return {
      username: "",
      password: "",
      password2: "",
    };
  },
  computed: {
    btnName() {
      return this.isReg ? "注册" : "登录";
    },
    isLegal() {
      const reg2Uname = /^[a-zA-Z]{1}[0-9a-zA-Z_]{3,15}$/;
      const reg2Pwd = /[a-zA-Z0-9_]{6,16}/;
      return {
        name: reg2Uname.test(this.username),
        pwd: reg2Pwd.test(this.password),
        isPwdSame: this.isReg ? this.password === this.password2 : true
      };
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      if (this.isLegal.name && this.isLegal.pwd&&this.isLegal.isPwdSame) {
        this.$emit("submit", this.isReg, {
          username:this.username,
          password:this.password
        });
      } else {
        alert("填写错误");
      }
    },
    goDown(){
      document.querySelector("input[type='password']").focus();
    }
  }
};
</script>

<style scoped>
#mainLog {
  background-image: linear-gradient(45deg, #eae5c9, #6cc6cb);
  box-shadow: 0 0 10px black;
  position: relative;
}

#log-reg {
  max-width: 98vw;
  max-height: 90vh;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-around;
}
@media all and (max-width: 768px) {
  #log-reg {
    width: 90vw;
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
  border: none;
}
input[type="submit"] {
  color: #f5f6fa;
  background-color: #00a8ff;
  cursor: pointer;
}
input[type="text"]:focus,
input[type="password"]:focus {
  box-shadow: 0 0 3px black;
}
input[type="submit"]:hover {
  box-shadow: 0 0 4px black;
}
</style>