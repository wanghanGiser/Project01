<template>
  <div class="view">
    <div class="header">
      <h3>用户信息</h3>
    </div>
    <div id="conte">
      <div style="position:relative">
        <img :src="image1" />
        <input type="file" accept="image/*" id="img" @change="check($event)" />
      </div>
      <div>
        <span>昵称:</span>
        <input type="text" id="txt" />
      </div>
      <div>
        <span>原密码:</span>
        <input type="password" id="oldpwd" />
      </div>
      <div>
        <span>新密码:</span>
        <input type="password" id="newpwd" />
      </div>
      <div>
        <span>确认密码:</span>
        <input type="password" id="confirmpwd" />
      </div>
      <input type="button" @click="upload()" value="保存" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      default: require("@/assets/unlogin.png")
    }
  },
  data() {
    return {
      flag: true,
      image1: this.image
    };
  },
  watch: {
    image(newValue) {
      this.image1 = newValue;
    }
  },
  methods: {
    upload() {
      let formData = new FormData();
      let reg = /[a-zA-Z0-9_]{6,16}/;
      let file = document.getElementById("img").files[0];
      if (!this.flag) file=null;
      let text = document.getElementById("txt");
      let oldpwd = document.getElementById("oldpwd");
      let newpwd = document.getElementById("newpwd");
      let confirmpwd = document.getElementById("confirmpwd");
      if (
        !(
          file ||
          text.value ||
          oldpwd.value ||
          newpwd.value ||
          confirmpwd.value
        )
      )
        return;
      file && formData.append("file", document.getElementById("img").files[0]);
      text.value && formData.append("text", text.value);
      if (oldpwd.value) {
        if (
          newpwd.value &&
          newpwd.value === confirmpwd.value &&
          reg.test(newpwd.value)
        ) {
          formData.append("oldpwd", oldpwd.value);
          formData.append("newpwd", newpwd.value);
        } else {
          alert("密码不一致,或者格式错误");
          return;
        }
      }

      this.$ajax
        .post("/user/updateInfo", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data) {
            let obj = {};
            if (file) {
              obj.img = this.image1;
            }
            if (text.value) {
              obj.text = text.value;
            }
            this.$emit("changeinfo", obj);
            alert("修改成功");
          }
        });
    },
    check(e) {
      if (e.target.files[0].size > 1000000) {
        this.flag = false;
        alert("文件不能超过1M");
        return;
      }
      this.flag = true;
      let reader = new FileReader();
      // 读取文件的路径，没有返回值,结果在reader.result里
      reader.readAsDataURL(e.target.files[0]);
      // 读取需要时间，读完后再修改图片路径
      let self = this;
      reader.onloadend = function() {
        self.image1 = this.result;
      };
    }
  }
};
</script>

<style scoped>
#conte {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}

#conte > div {
  width: 100%;
  display: flex;
  margin: 2em auto;
}
input {
  background-color: inherit;
  justify-self: center;
  min-width: 0;
  flex: 1;
  font-size: 1em;
  text-align: center;
  outline: none;
  border-bottom: 1px solid #000;
}

input[type="file"] {
  opacity: 0;
  position: absolute;
  width: 5em;
  height: 5em;
  left: 50%;
  transform: translateX(-50%);
}
img {
  width: 5em;
  height: 5em;
  margin: 0 auto;
}
input[type="button"] {
  width: 80%;
  background-color: #2d98da;
  color: #fff;
  padding: 3px;
  margin-left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  border: none;
}
</style>