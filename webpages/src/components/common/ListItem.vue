<template>
  <div>
    <li>{{index}}-->{{test[index-1]}}</li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: ["wanghan", "zhangsan", "王涵", "lisi", "wangwu", "前六"]
    };
  },
  props: {
    index:Number
  }
};
</script>

<style>
</style>