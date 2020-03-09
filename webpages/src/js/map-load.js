import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {
  getWidth,
  getTopLeft
} from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import {
  get as getProjection
} from 'ol/proj';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import VectorLayer from 'ol/layer/Vector';
import {
  Cluster,
  Vector as VectorSource
} from 'ol/source';
import GeoJSON from "ol/format/GeoJSON"
import {
  Style,
  Text,

} from 'ol/style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import $Ajax from "../network/request"
import {
  Feature,
  Overlay,
  Geolocation
} from 'ol';
import Point from 'ol/geom/Point';
import CircleStyle from 'ol/style/Circle';
import HeatMap from "ol/layer/Heatmap"
import store from "@/store/store"
import axios from 'axios'
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';

let geoLocation, map;

function mapInit() {
  var projection = getProjection('EPSG:4326');
  var projectionExtent = projection.getExtent();
  var size = getWidth(projectionExtent) / 256;
  var resolutions = new Array(14);
  var matrixIds = new Array(14);
  for (var z = 0; z < 18; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
  }
  map = new Map({
    layers: [
      new TileLayer({
        opacity: 0.7,
        source: new WMTS({
          name: "中国矢量1-4级",
          url: "http://t5.tianditu.gov.cn/vec_c/wmts?tk=c5273291d67d7693ff89c724805a11da",
          layer: "vec",
          style: "default",
          matrixSet: "c",
          format: "tiles",
          wrapX: true,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent).map((x, i) => {
              if (i == 0) {
                return x +0.0057;
              }
              return x-0.00035
            }),
            //resolutions: res.slice(0, 15),
            resolutions: resolutions,
            matrixIds: matrixIds
          })
        })
      }),
      new TileLayer({
        source: new WMTS({
          name: "中国矢量注记1-4级",
          url: "http://t0.tianditu.gov.cn/cva_c/wmts?tk=c5273291d67d7693ff89c724805a11da",
          layer: "cva",
          style: "default",
          matrixSet: "c",
          format: "tiles",
          wrapX: true,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent).map((x, i) => {
              if (i == 0) {
                return x + 0.0057;
              }
              return x-0.00035
            }),
            resolutions: resolutions,
            matrixIds: matrixIds
          })
        })
      }),
      new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeaturesFromObject(require("@/assets/linyi.json"))
        }),
        style: new Style({ //显示的颜色
          fill: new Fill({
            color: 'rgba(32, 191, 107,0.1)'
          }),
          stroke: new Stroke({
            color: '#319FD3', //边界颜色
            width: 1 //边界线条粗细
          })
        })
      })
    ],
    target: 'map',
    view: new View({
      center: [118.3506988, 35.3032403],
      projection: projection,
      zoom: 10,
      minZoom: 4
    })
  });
  geoLocation = new Geolocation({
    tracking: false,
    trackingOptions: {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 600000
    },
    projection: map.getView().getProjection(),
  });
  geoLocation.once("error", function () {
    geoLocation.setTracking(false);
    alert("定位失败！请确认是否打开定位权限")
  })
  let positionFeature = new Feature();
  positionFeature.setStyle(new Style({
    image: new CircleStyle({
      radius: 12,
      fill: new Fill({
        color: '#eb3b5a'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2
      })
    })
  }));
  geoLocation.on("change:tracking", () => {
    if (!geoLocation.getTracking()) {
      map.getView().animate({
        center: [118.3506988, 35.3032403],
        zoom: 10
      });
      positionFeature.setGeometry(null)
    }
  })
  geoLocation.on('change:position', function () {
    positionFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 12,
        fill: new Fill({
          color: '#eb3b5a'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        })
      })
    }));
    let coordinates = geoLocation.getPosition();
    store.commit("setLocal", coordinates.map(x => {
      return x.toFixed(6);
    }).toString())
    positionFeature.setGeometry(coordinates ?
      new Point(coordinates) : null);
    map.getView().animate({
      center: coordinates,
      zoom: 15
    });
  });
  new VectorLayer({
    map: map,
    source: new VectorSource({
      features: [positionFeature]
    })
  });
  document.getElementById("locate").onclick = function () {
    geoLocation.setTracking(!geoLocation.getTracking());
  }
  return map;
}
async function getPoints(cata, map) {
  let idText = cata == "scenic" ? "scenic_id" : "restaurant_id";
  let levelText = cata == "scenic" ? "level_for_order" : "rest_level"
  let data = (await getData(cata)).data;
  let features = new Array(data.length);
  for (let i in data) {
    let location = data[i].location.split(",").map(item => parseFloat(item));
    let id = data[i][idText];
    let name = data[i].name_cn;
    let level = data[i][levelText];
    let feature = new Feature({
      geometry: new Point(location.map((x, i) => {
        if (i == 0) {
          return x + 0.0057;
        }
        return x-0.00035
      })),
      sr_id: id,
      sr_name: name,
      level: level
    })
    features[i] = feature;
  }

  let source = new VectorSource({
    features: features
  })
  let clusterSource = new Cluster({

    distance: 25,
    source: source
  })




  let layer = new VectorLayer({
    source: clusterSource,
    style: function (features) {
      let feature = features.get("features").sort(function (a, b) {
        if (a.get("level") > b.get("level")) {
          return -1;
        }
        return 1;
      })[0];
      let style = new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({
            color: '#fff'
          }),
          fill: new Fill({
            color: '#3399CC'
          })
        }),
        text: new Text({
          text: feature.get("sr_name").replace(/^((.{2,3}(市|县|区))|临沂{1})/, ""),
          fill: new Fill({
            color: "#4b6584"
          }),
          offsetY: 15
        })
      });
      return style;
    }
  })
  let first = true;
  let heatmap;
  document.getElementById("heat-map").onclick = function () {
    layer.setVisible(!layer.getVisible())
    if (first) {
      heatmap = new HeatMap({
        source: clusterSource,
        blur: 5,
        radius: 10,
        weight: function (feature) {
          return parseInt(feature.get("features").sort(function (a, b) {
            if (a.get("level") > b.get("level")) {
              return -1;
            }
            return 1;
          })[0].get("level").substr(0, 1)) / 5;
        },
        visible: true
      })
      map.addLayer(heatmap);
      first = false;
    } else {
      heatmap.setVisible(!heatmap.getVisible());
    }
  }
  return layer
}
async function getData(cata) {
  return $Ajax.get(cata == "scenic" ? "/scenic/scenic_list" : "/rest/rest_list")
}

function setOverLay(el) {
  return new Overlay({
    element: document.getElementById(el),
    positioning: 'bottom-left',
    autoPan: true,
    insertFirst: false,
    stopEvent: true,
    autoPanAnimation: {
      duration: 400
    }
  });
}
async function addFeatureInfo(cata, id, element1) {
  let element = document.createElement("div");
  let res = await (await getInfo(cata, id)).data;
  let h1 = document.createElement("h2");
  h1.innerText = res.name_cn;
  element.appendChild(h1);
  let p = document.createElement("p");
  p.innerText = res.description;
  element.appendChild(p);
  let img = document.createElement("img");
  img.setAttribute("src", "https://res.sdta.cn/" + res.default_photo)
  element.appendChild(img);
  let btn = document.createElement("button");
  btn.setAttribute("id", "gohere");
  btn.innerText = "去这里"
  element.appendChild(btn)
  btn.addEventListener("click", () => {
    getRoute();
  })
  element1.innerHTML = "";
  element1.appendChild(element)
  return true
}
async function getInfo(cata, id) {
  return $Ajax.post(cata == "scenic" ? "/scenic/info" : "/rest/info", {
    "id": id
  })
}

function getRoute() {
  if (!geoLocation.getTracking()) {
    geoLocation.setTracking(true);
    geoLocation.once("change:position", () => {
      let origin = geoLocation.getPosition();
      geoLocation.setTracking(false);
      let url = "https://restapi.amap.com/v3/direction/walking?" +
        "origin=" + origin.map(x => {
          return x.toFixed(6)
        }).toString() + "&" +
        "destination=" + store.state.activePoint + "&" +
        "output=json&key=12a571a01faffd202d45ec15b944583a";
      axios.get(url).then(res => {
        let steps = res.data.route.paths[0].steps
        let arr = new Array(steps.length);
        for (let i = 0; i < steps.length; i++) {
          arr[i] = steps[i].polyline.split(";").map(x => {
            return x.split(",").map(y => {
              return parseFloat(y)
            })
          });
        }
        multiLine(arr);
      });
    })
  } else {
    let url = "https://restapi.amap.com/v3/direction/driving?" +
      "origin=" + store.state.position + "&" +
      "destination=" + store.state.activePoint + "&" +
      "output=json&key=12a571a01faffd202d45ec15b944583a"
    axios.get(url).then(res => {
      let steps = res.data.route.paths[0].steps
      let arr = new Array(steps.length);
      for (let i = 0; i < steps.length; i++) {
        arr[i] = steps[i].polyline.split(";").map(x => {
          return x.split(",").map(y => {
            return parseFloat(y)
          })
        });
      }

      multiLine(arr)
    })
  }
}
let route;

function multiLine(arr) {
  map.removeLayer(route);
  let lines = new Array();
  for (let i = 0; i < arr.length; i++) {
    lines[i] = new LineString(arr[i])
  }

  let source = new VectorSource({
    features: [new Feature({
      geometry: new MultiLineString(lines)
    })]
  });

  route = new VectorLayer({
    source: source,
    style: new Style({
      stroke: new Stroke({
        width: 4,
        color: "red"
      })
    })
  });
  map.addLayer(route)
}
export {
  mapInit,
  getPoints,
  setOverLay,
  addFeatureInfo
};