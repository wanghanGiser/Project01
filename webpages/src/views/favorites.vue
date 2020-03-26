<template>
  <div id="favo">
    <h3>这是收藏夹</h3>
    <input type="checkbox" id="check1"/>
    <ul>
      <label for="check1" v-if="datas[0].length>0">景区></label>
      <li v-for="(item,index) in datas[0]" :key="index">{{item}}</li>
    </ul>
    <hr />
    <input type="checkbox" id="check2" />
    <ul>
      <label for="check2" v-if="datas[1].length>0">餐厅></label>
      <li v-for="(item,index) in datas[1]" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: []
    };
  },
  beforeCreate() {
    this.$ajax.get("/user/getfav").then(res => {
      console.log(res.data);

      this.datas = res.data;
    });
  }
};
</script>

<style scoped>
#favo {
  float: left;
  color: #353b48;
  height: 100vh;
  overflow: auto;
  padding: 1em;
  transition: 0.5s all ease-in-out;
}
@media screen and (max-width: 768px) {
  #favo {
    width: 100vw;
  }
}
@media screen and (min-width: 769px) {
  #favo {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 993px) {
  #favo {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 1201px) {
  #favo {
    width: calc(100vw - 300px);
  }
}
ul {
  list-style: none;
  padding-left: 2em;
  margin-top: 1em;
}
li {
  display: block;
  hyphens: auto;
  padding-left: 2em;
  height: 0;
  overflow: auto;
  transition: height 0.5s ease-in-out;
}
li:hover {
  color: #fff;
  background-color: #45aaf2;
}

input[type="checkbox"] {
  display: none;
}
input[type="checkbox"]:checked + ul > li {
  height: auto;
}
</style>