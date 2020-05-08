import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {
  get as getProjection
} from 'ol/proj';
import {
  Vector as VectorLayer,
  // Heatmap
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
  Icon
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
import {
  getDistance
} from 'ol/sphere';

const CENTER = [118.3506988, 35.1032403];
const projection = getProjection('EPSG:4326');
const nearStyle = function (feature, center) {
  let features = feature.get("features").sort(function (a, b) {
    if (a.get("level") > b.get("level")) {
      return -1;
    }
    return 1;
  });
  let isNear = false;
  let text;
  features.forEach(item => {
    if (getDistance(center, item.getGeometry().getCoordinates()) < 10000) {
      isNear = true;
      text = item.get("sr_name");
    }
  })
  let style = new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({
        color: isNear ? "red" : "#3399CC"
      })
    }),
    text: new Text({
      text: text ? text : features[0].get("sr_name").replace(/^((.{2,3}(市|县|区))|临沂{1})/, ""),
      fill: new Fill({
        color: "#4b6584"
      }),
      offsetY: 15
    })
  })
  return style;
}
const levelStyle = function (features) {
  let feature = features.get("features").sort(function (a, b) {
    if (a.get("level") > b.get("level")) {
      return -1;
    }
    return 1;
  })[0];
  let style = new Style({
    image: new CircleStyle({
      radius: (function (level) {
        switch (level) {
          case "5":
            return 10
          case "4":
            return 8
          case "3":
            return 6
          case "2":
            return 5
          default:
            return 5
        }
      })(feature.get("level").substr(0, 1)),
      fill: new Fill({
        color: (function (level) {
          switch (level) {
            case "5":
              return "rgb(234, 32, 39)"
            case "4":
              return "rgb(255, 195, 18)"
            case "3":
              return "rgb(196, 229, 56)"
            case "2":
              return "rgb(18, 203, 196)"
            default:
              return "rgb(0, 148, 50)"
          }
        })(feature.get("level").substr(0, 1))
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
const normalStyle = function (features) {
  let feature = features.get("features").sort(function (a, b) {
    if (a.get("level") > b.get("level")) {
      return -1;
    }
    return 1;
  })[0];
  let style = new Style({
    image: new CircleStyle({
      radius: 10,
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
    if (store.state.position) {
      map.getView().animate({
        center: store.state.position,
        zoom: 13
      });
      return;
    }
    map.getView().animate({
      center: CENTER,
      zoom: 10
    });
  })
  return map;
}

function getLocation(map) {
  let geoLocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
      timeout: 5000
    },
    projection: projection,
  });
  geoLocation.setTracking(true);
  let positionFeature = new Feature();
  positionFeature.setStyle(new Style({
    image: new Icon({
      src: require("@/assets/locate1.png"),
      scale: 0.7,

    })
  }));
  geoLocation.on("change:position", () => {
    let coordinates = geoLocation.getPosition();
    store.commit("setLocation", coordinates)
    positionFeature.setGeometry(coordinates ?
      new Point(coordinates) : null);
    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [positionFeature]
      })
    });
    geoLocation.setTracking(false);
    geoLocation = null
  });

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
    style: function (feature) {
      return normalStyle(feature)
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

function setHeatMap(layer, bool) {
  if (bool) {
    setStyleFunc(layer, normalStyle);
  } else {
    setStyleFunc(layer, levelStyle)
  }
  return !bool
}

function setStyleFunc(layer, func) {
  layer.setStyle(function (feature) {
    return func(feature)
  })
}


async function addFeatureInfo(cata, id) {
  store.state.overLay.setPosition(undefined);
  let res = await (await getInfo(cata, id)).data;
  res.distance = store.state.position ? (getDistance(store.state.position, store.state.activePoint.split(",")) / 1000).toFixed(1) : 0
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
    }), endFea]
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

function getNear(center, layer, bool) {
  if (bool) {
    layer.setStyle(function (f) {
      return normalStyle(f)
    })
  } else {
    layer.setStyle(function (f) {
      return nearStyle(f, center)
    })
  }
  return !bool;
}
export {
  mapInit,
  getPoints,
  setOverLay,
  addFeatureInfo,
  setHeatMap,
  getRoute,
  getLocation,
  getNear
};