<template>
  <div id="map">
    <div id="popup">
      <div id="poput-content"></div>
    </div>
  </div>
</template>

<script>
import {
  mapInit,
  getPoints,
  setOverLay,
  addFeatureInfo
} from "@/js/map-load.js";
export default {
  data() {
    return {
      isFirst: true,
      scenicLayer: {},
      restLayer: {},
      contentOpt: {
        title: "",
        description: "",
        image: ""
      }
    };
  },
  watch: {
    "$store.state.cata": function(newValue) {
      if (this.isFirst) {
        this.scenicLayer.setVisible(false);
        getPoints(this.$store.state.cata).then(res => {
          this.restLayer = res;
          this.map.addLayer(this.restLayer);
          this.isFirst = false;
        });
        return;
      }
      this.scenicLayer.setVisible(newValue === "scenic");
      this.restLayer.setVisible(newValue === "rest");
    }
  },
  async mounted() {
    this.map = mapInit();
    this.scenicLayer = await getPoints(this.$store.state.cata, this.map);

    this.map.addLayer(this.scenicLayer);
    let popupOverLay = setOverLay("popup");
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
        self.$store.commit("setPosition", coordinates.toString());
        feature = feature.get("features").sort(function(a, b) {
          if (a.get("level") > b.get("level")) {
            return -1;
          }
          return 1;
        })[0];

        addFeatureInfo(
          self.$store.state.cata,
          feature.get("sr_id"),
          document.getElementById("popup")
        ).then(res => {
          if (res) {
            popupOverLay.setPosition(coordinates);
          }
        });
      } else {
        popupOverLay.setPosition(undefined);
      }
    });
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
  width: 500px;
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
#popup > div {
  height: 100%;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
}
#popup > div img {
  width: 100%;
  max-width: 88vw;
}
</style>