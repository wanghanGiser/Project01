<template>
  <div id="map" class="view">
    <div style="height:0;position:relative">
      <ul id="legend" :style="{transform:'translateY('+translate+')'}">
        <li>5</li>
        <li>4</li>
        <li>3</li>
        <li>2</li>
        <li>0</li>
      </ul>
    </div>
    <div id="popup">
      <div id="popup-content">
        <div
          id="alert1"
          style="width:5em;position:absolute;top:70%;display:none;text-align:center;background-color:rgba(0,0,0,0.5);color:#fff;padding:7px;font-size:1.3em;left:50%;margin-left:-2.5em"
        >收藏成功</div>
        <div>
          <h2>
            {{$store.state.info.title}}
            <h6 v-show="$store.state.position">距您:{{$store.state.info.distance}}km</h6>
          </h2>
        </div>
        <div style="width:100%">
          <div>
            <button id="gohere" :style="{backgroundImage:routeImg}"></button>
            <label :style="{backgroundImage:image}">
              <div class="count">{{f_count}}</div>
              <input
                type="checkbox"
                id="che"
                :checked="$store.state.info.ischecked"
                @click="store($event)"
              />
            </label>
            <button :style="{backgroundImage:image1}">
              <div class="count">0</div>
            </button>
          </div>
        </div>
        <p>{{$store.state.info.description}}</p>
        <img :src="'https://res.sdta.cn/'+$store.state.info.image" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapInit,
  getPoints,
  setOverLay,
  addFeatureInfo,
  getLocation,
  setHeatMap,
  getRoute,
  getNear
} from "@/js/map-load.js";
import Heatmap from "ol/layer/Heatmap";
let store = require("@/assets/stored.png");
let unstore = require("@/assets/unstore.png");
export default {
  data() {
    return {
      scenicLayer: null,
      restLayer: null,
      image1: "url(" + require("@/assets/comment.png") + ")",
      routeImg: "url(" + require("@/assets/route.png") + ")",
      distance: 0,
      layersStatus: {
        scenic: {
          heatmap: false,
          near: false
        },
        rest: {
          heatmap: false,
          near: false
        }
      }
    };
  },
  computed: {
    f_count() {
      return this.$store.state.info.f_count > 1000
        ? this.$store.state.info.f_count > 10000
          ? parseInt(this.$store.state.info.f_count / 10000) + "w+"
          : parseInt(this.$store.state.info.f_count / 1000) + "k+"
        : this.$store.state.info.f_count;
    },
    image() {
      return this.$store.state.info.ischecked
        ? "url(" + store + ")"
        : "url(" + unstore + ")";
    },
    translate() {
      let buf;
      let flag = this.$store.state.cata == "scenic";
      if (
        (flag && this.layersStatus.scenic.heatmap) ||
        (!flag && this.layersStatus.rest.heatmap)
      ) {
        buf = "0";
      } else {
        buf = "-100%";
      }
      return buf;
    }
  },
  methods: {
    store($event) {
      if (!this.$store.state.isLogin) {
        alert("请先登录");
        return;
      }
      if (this.$store.state.info.ischecked) {
        return;
      }
      //后台加入收藏
      this.$ajax
        .post("/user/updatefav", {
          mothod: "put",
          favo: $event.target.getAttribute("sr_id"),
          cata: this.$store.state.cata
        })
        .then(res => {
          if (res.data) {
            let alert1 = document.getElementById("alert1");
            alert1.style.display = "block";
            this.$store.commit("setIsCheched");
            this.$store.commit("setFCount");
            setTimeout(() => {
              alert1.style.display = "none";
            }, 1000);
          }
        });
    }
  },
  activated() {
    if (!this.map.getSize()) this.map.updateSize();
  },
  watch: {
    "$store.state.cata": function(newValue) {
      this.map.getLayers().forEach(item => {
        if (item instanceof Heatmap)
          item.getVisible() && item.setVisible(false);
      });
      if (!this.restLayer) {
        this.scenicLayer.setVisible(false);
        getPoints(this.$store.state.cata).then(res => {
          this.restLayer = res;
          this.map.addLayer(this.restLayer);
        });
        return;
      }
      this.scenicLayer.setVisible(newValue == "scenic");
      this.restLayer.setVisible(newValue == "rest");
    },
    "layersStatus.scenic.heatmap"(newvalue) {
      if (newvalue) {
        if (this.layersStatus.scenic.near) {
          this.layersStatus.scenic.near = false;
        }
      }
    },
    "layersStatus.scenic.near"(newvalue){
      if(newvalue){
        if(this.layersStatus.scenic.heatmap){
          this.layersStatus.scenic.heatmap=false
        }
      }
    },
    "layersStatus.rest.heatmap"(newvalue) {
      if (newvalue) {
        if (this.layersStatus.rest.near) {
          this.layersStatus.rest.near = false;
        }
      }
    },
    "layersStatus.rest.near"(newvalue){
      if(newvalue){
        if(this.layersStatus.rest.heatmap){
          this.layersStatus.rest.heatmap=false
        }
      }
    }
  },
  async mounted() {
    this.map = mapInit();
    getLocation(this.map);
    this.scenicLayer = await getPoints(this.$store.state.cata);
    this.map.addLayer(this.scenicLayer);
    let popupOverLay = setOverLay("popup");
    let route;
    popupOverLay.on("change:position", () => {
      if (popupOverLay.getPosition()) {
        route && this.map.removeLayer(route);
        document.getElementById("gohere").onclick = async () => {
          route = await getRoute();
          if (route) {
            this.map.getView().animate({
              center: this.$store.state.position,
              zoom: 12
            });
            this.map.addLayer(route);
          }
        };
      }
    });

    this.scenicLayer.on("change:visible", () => {
      route && this.map.removeLayer(route);
    });
    document.getElementById("locate").addEventListener("click", () => {
      if (this.$route.path != "/") return;
      route && this.map.removeLayer(route);
    });
    this.$store.commit("setOverLay", popupOverLay);
    this.map.addOverlay(popupOverLay);
    document.getElementById("popup").style.visibility = "visible";
    let self = this;
    this.map.on("click", function(evt) {
      let feature = self.map.forEachFeatureAtPixel(evt.pixel, function(
        feature
      ) {
        return feature;
      });
      if (feature && feature.get("features")) {
        var coordinates = feature.getGeometry().getCoordinates();
        self.$store.commit(
          "setPosition",
          coordinates
            .map(x => {
              return x.toFixed(6);
            })
            .toString()
        );
        feature = feature.get("features").sort(function(a, b) {
          if (a.get("level") > b.get("level")) {
            return -1;
          }
          return 1;
        })[0];

        addFeatureInfo(self.$store.state.cata, feature.get("sr_id")).then(
          res => {
            if (res) {
              self.$store.commit("setInfo", res);
              document
                .getElementById("che")
                .setAttribute("sr_id", feature.get("sr_id"));
              popupOverLay.setPosition(coordinates);
              document.getElementById("popup-content").scrollTop = 0;
            }
          }
        );
      } else {
        popupOverLay.setPosition(undefined);
      }
    });

    document.getElementById("heat-map").onclick = () => {
      if (this.$route.path != "/") return;
      this.layersStatus[this.$store.state.cata].heatmap = setHeatMap(
        this[this.$store.state.cata + "Layer"],
        this.layersStatus[this.$store.state.cata].heatmap
      );
    };
    document.getElementById("checkbox").onclick = () => {
      if (this.$route.path != "/") return;
      if (!this.$store.state.position) {
        alert("未获取到定位");
        return;
      }
      this.layersStatus[this.$store.state.cata].near = getNear(
        this.$store.state.position,
        this[this.$store.state.cata + "Layer"],
        this.layersStatus[this.$store.state.cata].near
      );
      this.$store.commit("setMenuShow");
      this.map.getView().animate({
        center: this.$store.state.position,
        zoom: 10
      });
    };
  }
};
</script>

<style>
#legend {
  position: absolute;
  right: 0;
  list-style: none;
  text-align: center;
  width: 2em;
  color: #fff;
  z-index: 1;
  background-color: #fff;
  transform: translateY(-100%);
  transition: transform 0.2s ease-out;
}
#legend > li:nth-child(1) {
  background-color: rgb(234, 32, 39);
}
#legend > li:nth-child(2) {
  background-color: rgb(255, 195, 18);
}
#legend > li:nth-child(3) {
  background-color: rgb(196, 229, 56);
}
#legend > li:nth-child(4) {
  background-color: rgb(18, 203, 196);
}
#legend > li:nth-child(5) {
  background-color: rgb(0, 148, 50);
}
#popup {
  position: absolute;
  background-color: #fff;
  width: 466px;
  z-index: 10;
  padding: 3px;
  box-sizing: border-box;
  visibility: hidden;
  max-width: 90vw;
  height: 80vh;
  bottom: 15px;
  left: -50px;
  border-radius: 10px;
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
}
#popup::before,
#popup::after {
  top: 100%;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  left: 46px;
}
#popup::after {
  border-top-color: #fff;
  border-width: 14px;

  margin-left: -10px;
}
#popup::before {
  border-top-color: #cccccc;
  border-width: 15px;
  margin-left: -11px;
}
#popup-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  overflow: auto;
  border-radius: 10px;
}
#popup-content > img {
  width: 100%;
  max-width: 88vw;
}
#popup-content > div > h2 {
  display: flex;
  align-items: baseline;
}
h2 > h6 {
  color: #778ca3;
  margin-left: auto;
}
#popup-content > div > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3.5em;
  border-bottom: 1px solid #ccc;
}
#popup-content > div > div input {
  display: none;
}

#popup-content > div > div label {
  margin-left: auto;
  display: inline-block;
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 1.5em;
  height: 1.5em;
}
label {
  position: relative;
  height: 0;
}
.count {
  position: absolute;
  width: 100%;
  height: 1em;
  text-align: center;
  line-height: 1em;
  color: #8a8a8a;
  font-size: 12px;
  top: 100%;
  left: 0;
  font-weight: 800;
}
#popup-content > div > div > button {
  border: none;
  outline: none;
  border-radius: 2px;
  display: inline-block;
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 2em;
  line-height: 2em;
  padding: 0 5px;
  text-align: center;
  color: #fff;
  width: 2em;
  position: relative;
  margin: 0 1em;
}
#popup-content > div > div > button:first-child {
  width: 2.2em;
  height: 2.2em;
  line-height: 2.2em;
  /* transform: translateY(5px); */
}
</style>