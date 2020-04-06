<template>
  <div class="view">
    <y-bar :series="series" :yAxis="yAxis" />
  </div>
</template>

<script>
import yBar from "@/components/charts/yBar.vue";
export default {
  components: {
    yBar
  },
  data() {
    return {
      series: [],
      yAxis: []
    };
  },
  watch:{
    "$store.state.cata"(){
      if(this.$route.path=="/chart"){
        this.getData()
      }
    }
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      this.$ajax.get("/" + this.$store.state.cata + "/getData").then(res => {
        let yabuf = [];
        let sebuf = [];
        while (res.data.length > 0) {
          let item = res.data.pop();
          let keys = Object.keys(item);
          yabuf.push(item[keys[3]]);
          sebuf.push({
            id: item[keys[0]],
            value: item[keys[1]],
            location: item[keys[2]]
          });
        }
        this.series = sebuf;
        this.yAxis = yabuf;
      });
    }
  }
};
</script>

<style>
</style>