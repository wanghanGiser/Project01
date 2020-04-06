<template>
  <div class="view">
    <div class="header">
      <h3>收藏夹</h3>
    </div>
    <div id="container1">
      <div v-for="(item,index) in datas[0]" :key="item.scenic_id" :id="item.scenic_id">
        <div class="item1">
          <a href="javascript:void(0);" @click="scenicView(item)">{{item.name_cn}}</a>
          <div class="close1" title="删除" @click="delS(item.scenic_id,index)">×</div>
        </div>
      </div>
      <div v-for="(item,index) in datas[1]" :key="item.restaurant_id" :id="item.restaurant_id">
        <div class="item1">
          <a href="javascript: void(0);" @click="restView(item)">{{item.name_cn}}</a>
          <div class="close1" title="删除" @click="delR(item.restaurant_id,index)">×</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addFeatureInfo } from "@/js/map-load.js";
export default {
  data() {
    return {
      datas: []
    };
  },
  activated() {
    if (this.$store.state.isLogin) {
      this.$ajax.get("/user/getfav").then(res => {
        this.datas = res.data;
      });
    } else {
      this.datas = [];
    }
  },
  methods: {
    scenicView(item) {
      this.$router.push({ path: "/" });
      this.$store.commit("setPosition", item.location);
      this.$store.commit("setCata", "scenic");

      addFeatureInfo("scenic", item.scenic_id).then(res => {
        if (res) {
          this.$store.commit("setInfo", res);
          document.getElementById("che").setAttribute("sr_id", item.scenic_id);
          this.$store.state.overLay.setPosition(item.location.split(","));
        }
      });
    },
    restView(item) {
      // console.log(item);
      this.$router.push({ path: "/" });
      this.$store.commit("setPosition", item.location);
      this.$store.commit("setCata", "rest");

      this.$nextTick(() => {
        addFeatureInfo("rest", item.restaurant_id).then(res => {
          if (res) {
            this.$store.commit("setInfo", res);
            document
              .getElementById("che")
              .setAttribute("sr_id", item.restaurant_id);
            this.$store.state.overLay.setPosition(item.location.split(","));
          }
        });
      });
    },
    delS(item, index) {
      this.$ajax
        .post("/user/updatefav", {
          mothod: "del",
          favo: item,
          cata: "scenic"
        })
        .then(res => {
          res.data &&
            delectELe(item, () => {
              this.datas[0].splice(index, 1);
            });
        });
    },
    delR(item, index) {
      this.$ajax
        .post("/user/updatefav", {
          mothod: "del",
          favo: item,
          cata: "rest"
        })
        .then(res => {
          res.data &&
            delectELe(item, () => {
              this.datas[1].splice(index, 1);
            });
        });
    }
  }
};
function delectELe(item, cb) {
  document.getElementById(item).style.transform = "translateX(100%)";
  setTimeout(() => {
    cb();
  }, 500);
}
</script>

<style scoped>
#container1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 3em);
}
#container1 > div {
  width: 80%;
  transition: transform 0.5s ease-in-out;
  transform-origin: right center;
}

.item1 {
  display: flex;
  align-items: center;
  height: 2.4em;
  line-height: 2.4em;
  margin-top: 0.8em;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.item1:hover {
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}
a {
  margin-left: 1em;
  font-weight: 800;
  color: #262626;
  font-size: 0.8em;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
a:hover {
  text-decoration: underline;
}
.close1 {
  margin-left: auto;
  width: 1.5em;
  height: 1.5em;
  border-radius: 2px;
  margin-right: 3px;
  line-height: 1.5em;
  text-align: center;
}
.close1:hover {
  background-color: #ccc;
  cursor: pointer;
}
</style>