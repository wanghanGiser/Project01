<template>
  <div id="toolbar">
    <div id="searchbox">
      <input id="search" type="search" :style="bkgImg" v-model.trim.lazy="$store.state.searchtext" @keyup.13="searchFocus()" />
    </div>
    <div id="selectbox">
      <select v-model="optSelect" @change="changeSelect()">
        <option value="scenic">景区</option>
        <option value="rest">酒店</option>
      </select>
    </div>
    <div id="checkbox">
      <a href="javascript:void(0);">筛选</a>
      <ul>
        <li v-for="(item,index) in levels[this.$store.state.cata]" :key="index">
          <label>
            <input type="checkbox" />
            {{item}}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bkgImg: {
        backgroundImage: "url(" + require("@/assets/search.png") + ")"
      },
      optSelect: "scenic",
      levels: {
        scenic: ["5A级", "4A级", "3A级", "2A级"],
        rest: ["5星级", "4星级", "3星级", "2星级"]
      },
    };
  },
  watch:{
    "$store.state.cata"(){
      this.$store.commit("changeSearch","")
    }
  },
  methods: {
    searchFocus() {
      document.getElementById("search").blur();
      this.$store.commit("changeNum",1)
      if(this.$store.state.searchtext!==""){
        this.$store.dispatch("getSearchRes")
        return
      }
      this.$store.dispatch("getSinceList")
    },
    changeSelect(){
      this.$store.commit("setCata",this.optSelect)
    }
  }
};
</script>

<style scoped>
#toolbar {
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
#searchbox {
  display: flex;
  height: 1.7em;
  position: relative;
}
input[type="search"] {
  outline: none;
  color: #353b48;
  border: 0.2px solid #0984e3;
  padding-left: 1.7em;
  background-size: 1.6em 1.6em;
  background-position: 1% 50%;
  background-repeat: no-repeat;
}
input[type="search"]:focus {
  box-shadow: 0 0 3px #0984e3;
}
#selectbox {
  width: 3em;
  height: 1.5em;
}
select {
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
}

#checkbox {
  position: relative;
  height: 1.5em;
  line-height: 1.5em;
  font-size: 0.8em;
}
#checkbox > ul {
  color: #353b48;
  position: absolute;
  right: 0;
  font-size: 1em;
  background-color: #fff;
  box-shadow: 0 0 1px #000;
  z-index: 20;
  list-style: none;
  height: 0;
  overflow: hidden;
}
#checkbox > ul > li {
  width: 5em;
  height: 2em;
  text-align: center;
  line-height: 2em;
}
#checkbox > ul > li:hover {
  background-color: #0984e3;
  color: #fff;
}
#checkbox:hover > ul {
  height: auto;
}
#checkbox > ul > li > label {
  display: block;
  width: 100%;
  height: 2em;
  line-height: 2em;
}
</style>>