<template>
  <div id="listbox">
    <tool-bar />
    <div style="overflow:auto;height:calc(100vh - 9em)" id="listcontent">
      <list-item
        v-for="(item,index) in $store.state.scenic_list"
        :id="item[id]"
        :name_cn="item.name_cn"
        :description="item.description"
        :location="item.location"
        :src="'https://res.sdta.cn/'+item.default_photo"
        :key="index"
        @itemClick="itemClick()"
      />
    </div>
    <list-footer />
  </div>
</template>

<script>
import ListItem from "@/components/common/ListItem";
import ListFooter from "@/components/common/ListFooter";
import ToolBar from "@/components/common/ToolBar";
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    ListItem,
    ListFooter,
    ToolBar
  },
  computed: {
    id() {
      return this.$store.state.cata == "scenic" ? "scenic_id" : "restaurant_id";
    }
  },
  methods: {
    ...mapActions(["getSinceList","getSearchRes"]),
    itemClick(){
      this.$emit("itemClick");
    }
  },
  mounted() {
    this.getSinceList();
  },
  watch: {
    "$store.state.pageNum": function() {
      document.getElementById("listcontent").scrollTop = 0;
      if(this.$store.state.searchtext!==""){
        this.getSearchRes();
        return
      }
      this.getSinceList();
    },
    "$store.state.cata": function() {
      document.getElementById("listcontent").scrollTop = 0;
      this.getSinceList();
      this.$store.commit("changeNum", 1);
    }
  }
};
</script>

<style>
#listbox {
  position: relative;
}
</style>