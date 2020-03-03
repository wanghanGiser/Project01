<template>
  <div id="list-footer">
    <a href="javascript:void(0);" id="topre">上一页</a>
    <div id="page-count">
      <a href="javascript:void(0);" class="pageitem">1</a>|
      <a href="javascript:void(0);" class="pageitem">2</a>|
      <a href="javascript:void(0);" class="pageitem">3</a>
    </div>
    <a href="javascript:void(0);" id="toafter">下一页</a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#list-footer {
  position: fixed;
  bottom: 0;
  height: 2em;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}
a {
  color: #747d8c;
}
#topre {
  margin-right: auto;
  padding-left: 5px;
}
#toafter {
  margin-left: auto;
  padding-right: 5px;
}
#page-count {
  display: flex;
  justify-content: space-between;
  height: 2em;
  line-height: 2em;
}
.pageitem{
  margin: 0 5px 0 5px
}
</style>