<template>
  <v-text-field
    class="base-input override-style"
    clearable
    outlined
    single-line
    validate-on-blur
    hide-details="auto"
    type="number"
    :disabled="item.disabled"
    :rules="[rules.required, rules.positive]"
    v-on:change="onChange($event, name)"
    v-model="item.value"
  ></v-text-field>
</template>

<style lang="scss">
.base-input.override-style {
  font-size: 14px;

  & > div > div:first-child {
    min-height: 38px;
    margin-top: 6px;
    margin-bottom: 6px;

    label {
      top: 9px;

      &.v-label--active {
        top: 18px;
      }
    }

    & > div:last-child {
      margin-top: 9px;
      min-width: 28px;

      button {
        font-size: 22px;
      }
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }

  & > div > div:last-child {
    margin-bottom: 6px;
  }
}
</style>

<script>
export default {
  name: "BaseInput",
  props: {
    name: String,
    item: Object,
  },
  data: function () {
    return {
      rules: {
        required: (v) => (v !== null && String(v).length > 0) || "Обов'язкове поле",
        positive: (v) => v >= 0 || "Число повинно бути більше або рівне нулю",
      },
    };
  },
  methods: {
    onChange(value, inputName) {
      this.$emit("inputChange", value, inputName);
    },
  },
};
</script>
