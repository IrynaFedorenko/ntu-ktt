<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="6" class="work-output-container">
        <v-card-title>Вихідні данні</v-card-title>
        <v-form ref="form" v-model="valid">
          <div class="switch-container" v-if="output.switches">
            <div v-for="(item, name) in output.switches" :key="name">
              <v-switch v-model="item.value" v-on:change="onSwitchChange($event, name)" :label="item.name"></v-switch>
            </div>
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th v-for="item in output.header" :key="item" class="text-left">
                    {{ item }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, name) in output.inputs" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td class="font-italic">
                    <BaseKatex v-bind:formula="item.formula"></BaseKatex>
                  </td>
                  <td>
                    <BaseKatex v-bind:formula="item.units"></BaseKatex>
                  </td>
                  <td>
                    <BaseInput v-bind:name="name" v-bind:item="item" v-on:inputChange="onInputChange"></BaseInput>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <div class="btn-container">
            <v-btn v-on:click="onSubmit"> Розрахувати </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.work-output-container {
  .v-data-table {
    padding-bottom: 16px;
  }
  tr > td {
    vertical-align: baseline;
  }
}
.btn-container {
  padding: 16px;
  display: flex;
  justify-content: end;
}
.switch-container {
  padding: 16px;

  & > div {
    padding-bottom: 8px;

    &:last-of-type {
      padding-bottom: 0;
    }

    & > div {
      margin-top: 0;
      padding-top: 0;

      & > div > div:last-child {
        display: none;
      }

      & > div > div:first-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

<script>
import BaseInput from "components/BaseInput";
import BaseKatex from "components/BaseKatex";

export default {
  name: "WorkOutput",
  components: {
    BaseInput,
    BaseKatex,
  },
  props: {
    output: Object,
  },
  data: () => {
    return {
      valid: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit");
      }
    },
    onInputChange(value, inputName) {
      this.$emit("outputInputChange", value, inputName);
    },
    onSwitchChange(value, switchName) {
      this.$emit("outputSwitchChange", value, switchName);
    },
  },
};
</script>
