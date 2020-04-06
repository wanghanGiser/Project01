<template>
  <div id="loading">
    <div
      id="loaded"
      :style="{
        transform:'translateX('+translateX+')',
        display: display,
        animationName:aname,
        animationPlayState:state,
        animationDuration:aduration}"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      aname: "",
      aduration: "",
      display: "block",
      translateX: "-100%",
      state: "running"
    };
  },
  watch: {
    "$store.state.count"(newvalue, oldvalue) {
      console.log(newvalue);

      if (newvalue > 0) {
        if (newvalue > oldvalue) {
          this.display = "none";
          this.translateX = "-100%";
          this.display = "block";
          this.start();
        }else{
          return;
        }
      } else {
        this.end();
      }
    }
  },
  methods: {
    start() {
      this.aname = "";
      this.translateX = "-100%";
      this.aname = "loading1";
      this.aduration = "3s";
      this.state = "running";
    },
    end() {
      this.aname = "loaded";
      this.aduration = ".5s";
      this.state = "running";
      this.translateX = "-100%";
    }
  },
  mounted() {
    document.getElementById("loaded").addEventListener("animationend", () => {
      if (this.aname == "loading1") {
        this.aname = "loading2";
        this.aduration = "5s";
      }
      if (this.aname == "loading2") {
        this.state = "paused";
      }
    });
  }
};
</script>

<style>
#loading {
  height: 0;
  position: relative;
}
#loaded {
  position: absolute;
  height: 2px;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 5;
  background-color: #45aaf2;
  animation-timing-function: ease-out;
}
@keyframes loading1 {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(-30%);
  }
}
@keyframes loading2 {
  from {
    transform: translateX(-30%);
  }
  to {
    transform: translateX(-15%);
  }
}
@keyframes loaded {
  from {
    transform: translateX(-15%);
  }
  to {
    transform: translateX(0);
  }
}
</style>