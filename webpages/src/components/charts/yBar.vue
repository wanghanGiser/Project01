<template>
  <div id="ybar"></div>
</template>
<script>
import Ec from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";
import { addFeatureInfo } from "@/js/map-load.js";
export default {
  props: {
    series: {
      type: Array,
      default: () => []
    },
    yAxis: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    series() {
      this.bar.setOption({
        series: [
          {
            data: this.series
          }
        ]
      });
    },
    yAxis() {
      this.bar.setOption({
        yAxis: {
          data: this.yAxis
        }
      });
    }
  },
  mounted() {
    this.bar = Ec.init(document.getElementById("ybar"));
    let option = {
      title: {
        text: "收藏量统计"
      },
      tooltip: {},
      grid: {
        left: "1%",
        right: "1%",
        bottom: "1%",
        containLabel: true
      },
      xAxis: {},
      yAxis: {
        data: this.yAxis,
        axisLabel: {
          formatter: function(value) {
            if (value.length > 5) {
              return value.substr(0, 6) + "…";
            }
            return value;
          }
        }
      },
      series: [
        {
          name: "收藏量",
          type: "bar",
          data: this.series
        }
      ]
    };
    this.bar.setOption(option);
    this.bar.on("click", param => {
      this.$store.commit("setPosition", param.data.location);
      this.$router.push({ path: "/" });

      addFeatureInfo(this.$store.state.cata, param.data.id).then(res => {
        if (res) {
          this.$store.commit("setInfo", res);
          document.getElementById("che").setAttribute("sr_id", param.data.id);
          this.$store.state.overLay.setPosition(param.data.location.split(","));
          document.getElementById("popup-content").scrollTop = 0;
        }
      });
    });
  }
};
</script>

<style scoped>
#ybar {
  width: 96%;
  height: 100%;
  margin: 0 auto;
}
</style>