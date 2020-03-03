<template>
  <div id="ListBox">
   <tool-bar/>
    <div style="overflow:auto;height:calc(100vh - 9em)">
      <list-item v-for="item in [0,1,2,3,6,7,8]"
       :name_cn="'风飒德萨斯喀飞洒飞洒卡拉烦死啦飒'"
       :description="'白日依山尽黄河入海流萨范德萨范德萨范德萨'"
       :key="item"/>
    </div>
    <list-footer/>
  </div>
</template>

<script>
import ListItem from "@/components/common/ListItem";
import ListFooter from "@/components/common/ListFooter";
import ToolBar from "@/components/common/ToolBar"
export default {
  data() {
    return {};
  },
  components: {
    ListItem,ListFooter,ToolBar
  }
};
</script>

<style>
</style>