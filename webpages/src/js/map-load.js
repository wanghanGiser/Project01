import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {
  get as getProjection
} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import {
  Cluster,
  Vector as VectorSource,
  XYZ
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

let map;
const CENTER = [118.3506988, 35.1032403];

function mapInit() {
  var projection = getProjection('EPSG:4326');
  map = new Map({
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
          wrapX: true
        }),
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
            color: '#319FD3',
            width: 1
          })
        })
      })
    ],
    target: 'map',
    view: new View({
      center: CENTER,
      projection: projection,
      zoom: 10,
      minZoom: 4
    })
  });
  let geoLocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: projection,
  });
  geoLocation.setTracking(true);
  geoLocation.on("change:position", () => {
    store.commit("setLocation", geoLocation.getPosition().toString())
    geoLocation.setTracking(false);
    geoLocation=null
  })
  geoLocation.once("error", function () {
    alert("定位失败！请确认是否开启定位权限");
  })
  document.getElementById("locate").onclick = function () {
    if (route) {
      map.removeLayer(route)
    }
    map.getView().animate({
      center: CENTER,
      zoom: 10
    });
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
      geometry: new Point(location),
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
  store.state.overLay.setPosition(undefined);
  if (route)
    map.removeLayer(route)
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
  // let k1="12a571a01faffd202d45ec15b944583a",k2="a7044ddd8924b179d05c4e39bbf8bbcc"
  store.state.overLay.setPosition(undefined)
  let url = "https://restapi.amap.com/v3/direction/driving?" +
    "origin=" +
    store.state.position + "&" +
    "destination=" + store.state.activePoint + "&" +
    "output=json&key=a7044ddd8924b179d05c4e39bbf8bbcc";
  map.getView().animate({
    center: store.state.position.split(","),
    zoom: 12
  })
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
var route;

function multiLine(arr) {
  map.removeLayer(route);
  let lines = new Array();
  let start = arr[0][0];
  let startFea = new Feature({
    geometry: new Point(start)
  })
  startFea.setStyle(new Style({
    image: new CircleStyle({
      radius: 15,
      stroke: new Stroke({
        color: '#fff'
      }),
      fill: new Fill({
        color: '#fc5c65'
      })
    }),
    text: new Text({
      text: "起",
      fill: new Fill({
        color: "#fff"
      })
    })
  }))
  let end = arr[arr.length - 1][arr[arr.length - 1].length - 1];
  let endFea = new Feature({
    geometry: new Point(end)
  })
  endFea.setStyle(new Style({
    image: new CircleStyle({
      radius: 15,
      stroke: new Stroke({
        color: '#fff'
      }),
      fill: new Fill({
        color: '#fc5c65'
      })
    }),
    text: new Text({
      text: "终",
      fill: new Fill({
        color: "#fff"
      })
    })
  }))
  for (let i = 0; i < arr.length; i++) {
    lines[i] = new LineString(arr[i])
  }
  let source = new VectorSource({
    features: [new Feature({
      geometry: new MultiLineString(lines)
    }), startFea, endFea]
  });
  route = new VectorLayer({
    source: source,
    style: new Style({
      stroke: new Stroke({
        width: 5,
        color: "#26de81"
      })
    })
  });
  map.addLayer(route);
}
export {
  mapInit,
  getPoints,
  setOverLay,
  addFeatureInfo
};