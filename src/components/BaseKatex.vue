<template>
  <div v-katex="formula"></div>
</template>

<script>
export default {
  name: "BaseKatex",
  props: {
    formula: String,
  },
};
</script>
