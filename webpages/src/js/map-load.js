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
  Overlay
} from 'ol';
import Point from 'ol/geom/Point';
import CircleStyle from 'ol/style/Circle';


function mapInit() {
  var projection = getProjection('EPSG:4326');
  var projectionExtent = projection.getExtent();
  var size = getWidth(projectionExtent) / 256;
  var resolutions = new Array(14);
  var matrixIds = new Array(14);
  for (var z = 0; z < 14; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
  }
  const map = new Map({
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
            origin: getTopLeft(projectionExtent),
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
            origin: getTopLeft(projectionExtent),
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
  return map;
}
async function getPoints(cata) {
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
  return layer
}
async function getData(cata) {
  return $Ajax.get(cata == "scenic" ? "/scenic/scenic_list" : "/rest/rest_list")
}

function setOverLay(el) {
  return new Overlay({
    element: document.getElementById(el),
    positioning: 'bottom-center',
    autoPan: true,
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
  element1.innerHTML = "";
  element1.appendChild(element)
  return true
}
async function getInfo(cata, id) {
  return $Ajax.post(cata == "scenic" ? "/scenic/info" : "/rest/info", {
    "id": id
  })
}
export {
  mapInit,
  getPoints,
  setOverLay,
  addFeatureInfo
};