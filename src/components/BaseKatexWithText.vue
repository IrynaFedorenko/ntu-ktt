<template>
  <span>
    <span v-for="(text, index) in texts" :key="index">
      {{ text }}
      <BaseKatex
        v-if="formulas[index] !== undefined"
        v-bind:formula="formulas[index]"
        v-bind:font-size="fontSize"
      ></BaseKatex>
    </span>
  </span>
</template>

<style scoped lang="scss">
.font-14 {
  font-size: 14px;
}
</style>

<script>
import BaseKatex from "components/BaseKatex";

export default {
  components: {
    BaseKatex,
  },
  name: "BaseKatexWithText",
  props: {
    texts: Array,
    formulas: Array,
    fontSize: {
      default: "0",
      type: String,
    },
  },
};
</script>
