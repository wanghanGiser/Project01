<template>
  <div id="map">这是map路由组件</div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
export default {
  mounted() {
    new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }
};
</script>

<style>
#map {
  float: left;
  height: 100vh;
}
@media screen and (max-width: 768px) {
  #map {
    width: 100vw;
  }
}
@media screen and (min-width: 769px) {
  #map {
    width: calc(100vw - 200px);
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
</style>