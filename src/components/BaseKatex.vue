<template>
  <span v-katex="formula" :class="'base-katex font-size-' + fontSize"></span>
</template>

<style lang="scss">
.base-katex {
  & > .katex {
    font-style: italic;
    font-family: "Roboto", serif;
  }
  &.font-size-14 > .katex {
    font-size: 14px;
  }
}
</style>

<script>
export default {
  name: "BaseKatex",
  props: {
    formula: String,
    fontSize: {
      default: "0",
      type: String,
    },
  },
};
</script>
