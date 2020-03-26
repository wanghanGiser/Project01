<template>
  <div id="list-footer">
    <button :disabled="$store.state.pageNum==1" @click="toUp()">上一页</button>
    <div id="page-count">
      <a
        @click="toPage($event)"
        href="javascript:void(0);"
        class="pageitem"
        v-show="$store.state.pageNum>1"
      >1</a>
      <span v-show="$store.state.pageNum>3">..</span>
      <a
        href="javascript:void(0);"
        @click="toPage($event)"
        class="pageitem"
        v-show="$store.state.pageNum>2"
      >{{$store.state.pageNum-1}}</a>
      <span>{{$store.state.pageNum}}</span>
      <a
        href="javascript:void(0);"
        class="pageitem"
        @click="toPage($event)"
        v-show="$store.state.pageNum<$store.state.pageCount-3"
      >{{$store.state.pageNum+1}}</a>
      <a
        href="javascript:void(0);"
        class="pageitem"
        @click="toPage($event)"
        v-show="$store.state.pageNum<$store.state.pageCount-2"
      >{{$store.state.pageNum+2}}</a>
      <span v-show="$store.state.pageNum<$store.state.pageCount-1">..</span>
      <a
        href="javascript:void(0);"
        class="pageitem"
        @click="toPage($event)"
        v-show="$store.state.pageNum<$store.state.pageCount"
      >{{$store.state.pageCount}}</a>
    </div>
    <button :disabled="$store.state.pageNum==$store.state.pageCount" @click="toDown()">下一页</button>
  </div>
</template>

<script>
export default {
 
  methods: {
    toPage($event) {
      this.$store.commit("changeNum", $event.target.text);
    },
    toUp() {
      this.$store.commit("setPageNum", -1);
    },
    toDown() {
      this.$store.commit("setPageNum", 1);
    }
  }
};
</script>

<style scoped>
#list-footer {
  position: relative;
  bottom: 0;
  height: 2em;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}
a {
  color: #a4b0be;
}
a:active {
  color: #ff7f50;
}
#list-footer > button {
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  color: #57606f;
}
#list-footer > button:first-child {
  margin-right: auto;
  padding-left: 3px;
}
#list-footer > button:last-child {
  margin-left: auto;
  padding-right: 3px;
}
#page-count {
  display: flex;
  justify-content: space-between;
  height: 2em;
  line-height: 2em;
}
.pageitem {
  margin: 0 5px 0 5px;
}
</style>