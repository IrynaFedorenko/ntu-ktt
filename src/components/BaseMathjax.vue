<template>
  <vue-mathjax class="style-container" :formula="formula"></vue-mathjax>
</template>

<style lang="scss">
.style-container > div {
  text-align: left !important;
}
</style>

<script>
import { VueMathjax } from "vue-mathjax";

export default {
  name: "BaseMathjax",
  components: {
    "vue-mathjax": VueMathjax,
  },
  props: {
    formula: String,
  },
};
</script>
