<template>
  <div id="toolbar">
    <div id="searchbox">
      <input
        id="search"
        type="search"
        :style="bkgImg"
        v-model.trim.lazy="$store.state.searchtext"
        @keyup.13="searchFocus()"
      />
    </div>
    <div id="selectbox">
      <select v-model="$store.state.cata">
        <option value="scenic">景区</option>
        <option value="rest">酒店</option>
      </select>
    </div>
    <div id="checkbox">
      <button>附近</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bkgImg: {
        backgroundImage: "url(" + require("@/assets/search.png") + ")"
      }
    };
  },
  watch: {
    "$store.state.cata"() {
      this.$store.commit("changeSearch", "");
    }
  },
  methods: {
    searchFocus() {
      document.getElementById("search").blur();
      this.$store.commit("changeNum", 1);
      if (this.$store.state.searchtext !== "") {
        this.$store.dispatch("getSearchRes");
        return;
      }
      this.$store.dispatch("getSinceList");
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
}
#checkbox > button {
  height: 1.8em;
  width: 3em;
  background-color: #0984e3;
  color: #fff;
  outline: none;
}
#checkbox > button:hover{
  border: 1px solid #000;
  cursor: pointer;
}
</style>>