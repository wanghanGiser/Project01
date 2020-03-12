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
  WMTS
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
import {
  getWidth,
  getTopLeft
} from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';

let map;
const CENTER = [118.3506988, 35.1032403];

function mapInit() {
  var projection = getProjection('EPSG:4326');
  const projectionExtent = projection.getExtent();
  const size = getWidth(projectionExtent) / 256;
  let resolutions = [];
  let matrixIds = [];
  for (let z = 2; z < 19; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z
  }
  map = new Map({
    layers: [
      new TileLayer({
        source: new WMTS({
          name: "中国矢量1-4级",
          url: "http://t5.tianditu.gov.cn/vec_c/wmts?tk=c5273291d67d7693ff89c724805a11da",
          layer: "vec",
          style: "default",
          matrixSet: "c",
          format: "tiles",
          wrapX: true,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            //resolutions: res.slice(0, 15),
            resolutions: resolutions,
            matrixIds: matrixIds
          })
        }),
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
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
          })
        }),
      }),
      new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeaturesFromObject(require("@/assets/linyi.json"))
        }),
        style: new Style({ //显示的颜色
          fill: new Fill({
            color: 'rgba(155, 191, 107,0.1)'
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
      enableHighAccuracy: true,
      timeout: 5000
    },
    projection: projection,
  });
  geoLocation.setTracking(true);
  geoLocation.on("change:position", () => {
    store.commit("setLocation", geoLocation.getPosition().toString())
    geoLocation.setTracking(false);
    geoLocation = null
  })
  geoLocation.once("error", function () {
    alert("定位失败！请确认是否开启定位权限,开启后请刷新页面重试。");
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
  let btn = document.createElement("button");
  btn.setAttribute("id", "gohere");
  btn.innerText = "去这里"
  element.appendChild(btn);
  btn.addEventListener("click", () => {
    getRoute();
  })
  let p = document.createElement("p");
  p.innerText = res.description;
  element.appendChild(p);
  let img = document.createElement("img");
  img.setAttribute("src", "https://res.sdta.cn/" + res.default_photo)
  element.appendChild(img);

  element1.innerHTML = "";
  element1.appendChild(element);
  return true
}
async function getInfo(cata, id) {
  return $Ajax.post(cata == "scenic" ? "/scenic/info" : "/rest/info", {
    "id": id
  })
}

function getRoute() {
  if (store.state.position == "") {
    alert("未获取到定位")
    return;
  }
  store.state.overLay.setPosition(undefined)
  map.getView().animate({
    center: store.state.position.split(","),
    zoom: 12
  })
  let url = 'http://api.tianditu.gov.cn/drive?postStr={%22orig%22:%22' +
    store.state.position +
    '%22,%22dest%22:%22' +
    store.state.activePoint +
    '54%22,%22style%22:%220%22}&type=search&tk=125199f53b84922a15d3e7e5e833752c';
  axios.get(url).then(res => {
    let parser = new DOMParser();
    let domDOC = parser.parseFromString(res.data, "text/xml");
    let arr = new Array();
    let arr1 = domDOC.getElementsByTagName("streetLatLon");
    for (let i = 0; i < arr1.length; i++) {
      arr[i] = arr1[i].innerHTML.replace(/;$/, "").split(";").map(x => {
        return x.split(",").map(y => {
          return parseFloat(y)
        })
      })
    }
    multiLine(arr)
  })
}
var route;

function multiLine(arr) {
  map.removeLayer(route);
  let start = store.state.position.split(",");
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
  let end = store.state.activePoint.split(",");
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
  let lines = new Array();
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