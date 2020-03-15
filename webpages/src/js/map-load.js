import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {
  get as getProjection
} from 'ol/proj';
import {
  Vector as VectorLayer,
  Heatmap
} from 'ol/layer';
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
import store from "@/store/store"
import axios from 'axios'
import {
  getWidth,
  getTopLeft
} from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';

const CENTER = [118.3506988, 35.1032403];
const projection = getProjection('EPSG:4326');
function mapInit() {
  
  const projectionExtent = projection.getExtent();
  const size = getWidth(projectionExtent) / 256;
  let resolutions = [];
  let matrixIds = [];
  for (let z = 2; z < 19; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z
  }
  let map = new Map({
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
  document.getElementById("locate").addEventListener("click", function () {
    map.getView().animate({
      center: CENTER,
      zoom: 10
    });
  })
  return map;
}

function getLocation() {
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
    positioning: 'bottom-left',
    autoPan: true,
    insertFirst: false,
    stopEvent: true,
    autoPanAnimation: {
      duration: 400
    }
  });
}

function setHeatMap(layer) {
  return getHeatMap(layer)
}

function getfeaStyle(feature) {
  return (
    (parseInt(
      feature.get("features").sort(function (a, b) {
        if (a.get("level") > b.get("level")) {
          return -1;
        }
        return 1;
      })[0]
      .get("level")
      .substr(0, 1)
    ) + 2) / 7
  );
}

function getHeatMap(layer) {
  return new Heatmap({
    source: layer.getSource(),
    blur: 5,
    radius: 10,
    weight: function (feature) {
      return getfeaStyle(feature)
    },
    visible: true
  })
}
async function addFeatureInfo(cata, id) {
  store.state.overLay.setPosition(undefined);
  let res = await (await getInfo(cata, id)).data;
  return res
}
async function getInfo(cata, id) {
  return $Ajax.post(cata == "scenic" ? "/scenic/info" : "/rest/info", {
    "id": id
  })
}

async function getRoute() {
  if (store.state.position == "") {
    alert("未获取到定位")
    return null;
  }
  store.state.overLay.setPosition(undefined)
  let url = 'http://api.tianditu.gov.cn/drive?postStr={%22orig%22:%22' +
    store.state.position +
    '%22,%22dest%22:%22' +
    store.state.activePoint +
    '54%22,%22style%22:%220%22}&type=search&tk=125199f53b84922a15d3e7e5e833752c';
  let res = await axios.get(url)
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
  return multiLine(arr);
}

function multiLine(arr) {
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

  let route = new VectorLayer({
    source: source,
    style: new Style({
      stroke: new Stroke({
        width: 5,
        color: "#26de81"
      })
    })
  });
  return route
}
export {
  mapInit,
  getPoints,
  setOverLay,
  addFeatureInfo,
  setHeatMap,
  getRoute,
  getLocation
};