<template>
  <div id="list-item" @click="changeMap()">
    <div id="imageBox">
      <img :src="src" />
    </div>
    <div id="descrip">
      <h4>{{title}}</h4>
      <p>{{content}}</p>
    </div>
  </div>
</template>

<script>
import { addFeatureInfo } from "@/js/map-load.js";
export default {
  data() {
    return {};
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: "http://www.sdta.cn/uploads/157225882496-3.png"
    },
    name_cn: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      required: true
    }
  },
  methods: {
    changeMap() {
      this.$emit("itemClick");
      this.$store.commit("setPosition", this.location);
      if (this.$route.path != "/") {
        this.$router.push({ path: "/" });
      }
      addFeatureInfo(this.$store.state.cata, this.id).then(res => {
        if (res) {
          this.$store.commit("setInfo", res);
          document.getElementById("che").setAttribute("sr_id", this.id);
          this.$store.state.overLay.setPosition(this.location.split(","));
          document.getElementById("popup-content").scrollTop = 0;
        }
      });
    }
  },
  computed: {
    title() {
      return this.name_cn.length > 9
        ? this.name_cn.substring(0, 9) + "..."
        : this.name_cn;
    },
    content() {
      return this.description.length > 35
        ? this.description.substring(0, 35) + "..."
        : this.description;
    }
  }
};
</script>

<style scoped>
#list-item {
  border: solid #fff;
  border-width: 0.1px 0 0.1px 0;
  cursor: pointer;
  height: 5em;
  display: flex;
  margin-top: 0.5em;
  align-items: center;
  background-color: #ffffff;
}
#list-item:hover {
  box-shadow: 0 0 5px #000;
}
#list-item:hover h4 {
  color: #0984e3;
}
#imageBox {
  flex: 4;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
#descrip {
  flex: 6;
  height: 100%;
  line-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
h4 {
  font-size: 0.8em;
  font-weight: 500;
  padding: 1px 7px;
  color: #2d3436;
  position: relative;
}
p {
  font-size: 0.7em;
  padding: 7px;
  overflow: hidden;
  position: relative;
}
</style>