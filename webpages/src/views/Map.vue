<template>
  <div id="map">
    <div id="popup">
      <div id="popup-content">
        <div
          id="alert1"
          style="width:5em;position:absolute;top:70%;display:none;text-align:center;background-color:rgba(0,0,0,0.5);color:#fff;padding:7px;font-size:1.3em;left:50%;margin-left:-2.5em"
        >收藏成功</div>
        <h2>{{$store.state.info.title}}</h2>
        <div>
          <div>
            <button id="gohere">去这里</button>
            <label :style="{backgroundImage:image}">
              <div>
                <div>{{f_count}}</div>
              </div>
              <input
                type="checkbox"
                id="che"
                :checked="$store.state.info.ischecked"
                @click="store($event)"
              />
            </label>
            <button :style="{backgroundImage:image1}"></button>
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
  setHeatMap,
  getRoute
} from "@/js/map-load.js";
import Heatmap from "ol/layer/Heatmap";
export default {
  data() {
    return {
      scenicLayer: null,
      restLayer: null,
      image1: "url(" + require("@/assets/comment.png") + ")"
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
        ? "url(" + require("@/assets/stored.png") + ")"
        : "url(" + require("@/assets/unstore.png") + ")";
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
      this.scenicLayer.setVisible(newValue === "scenic");
      this.restLayer.setVisible(newValue === "rest");
    }
  },
  beforeCreate() {
    this.$store.commit("setCata", "scenic");
  },
  async mounted() {
    this.map = mapInit();
    this.scenicLayer = await getPoints(this.$store.state.cata);
    this.map.addLayer(this.scenicLayer);
    let popupOverLay = setOverLay("popup");
    let route;
    popupOverLay.on("change:position", () => {
      document.getElementById("popup-content").scrollTop = 0;
      if (popupOverLay.getPosition()) {
        route && this.map.removeLayer(route);
        document.getElementById("gohere").onclick = async () => {
          route = await getRoute();
          if (route) {
            this.map.getView().animate({
              center: this.$store.state.position.split(","),
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
            }
          }
        );
      } else {
        popupOverLay.setPosition(undefined);
      }
    });
    let s_heat, r_heat;
    document.getElementById("heat-map").onclick = function() {
      let isscenic = self.$store.state.cata === "scenic";
      let layersource = isscenic ? self.scenicLayer : self.restLayer;
      layersource.setVisible(!layersource.getVisible());
      if (isscenic) {
        if (s_heat) {
          s_heat.setVisible(!s_heat.getVisible());
          return;
        }
        s_heat = setHeatMap(layersource);
        self.map.addLayer(s_heat);
        return;
      }
      if (r_heat) {
        r_heat.setVisible(!r_heat.getVisible());
        return;
      }
      r_heat = setHeatMap(layersource);
      self.map.addLayer(r_heat);
    };
  }
};
</script>

<style>
#map {
  float: left;
  height: 100vh;
  overflow: hidden;
}
@media screen and (max-width: 768px) {
  #map {
    width: 100vw;
  }
}
@media screen and (min-width: 769px) {
  #map {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 993px) {
  #map {
    width: calc(100vw - 300px);
  }
}
@media screen and (min-width: 1201px) {
  #map {
    width: calc(100vw - 300px);
  }
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
#popup-content > div > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
label > div {
  position: relative;
  height: 0;
}
label > div > div {
  position: absolute;
  width: 1em;
  height: 1em;
  text-align: center;
  line-height: 1em;
  color: #eb3b5a;
  font-size: 12px;
  top: -0.5em;
  font-weight: 600;
  border-radius: 50%;
  right: -0.4em;
}
#popup-content > div > div > button {
  margin: 0 1em;
  border: none;
  outline: none;
  border-radius: 2px;
  display: inline-block;
  background-color: #45aaf2;
  height: 2em;
  line-height: 2em;
  padding: 0 5px;
  text-align: center;
  color: #fff;
}
#popup-content > div > div > button:last-child {
  width: 2em;
  margin: 0 1em;
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>