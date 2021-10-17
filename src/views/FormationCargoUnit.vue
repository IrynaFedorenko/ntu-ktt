<template>
  <v-container>
    <WorkDescription v-bind:description="description"></WorkDescription>
    <WorkOutput v-bind:output="output" v-on:submit="onOutputSubmit"></WorkOutput>

    <v-row>
      <v-col cols="12">
        <v-card elevation="6" class="result-card">
          <v-card-title>Результати розрахунку</v-card-title>
          <v-simple-table class="result-table-container">
            <template v-slot:default>
              <thead>
                <tr>
                  <th rowspan="2">№ п/п</th>
                  <th rowspan="2">Cхема розміщення</th>
                  <th colspan="4">Кількість одиниць, шт</th>
                  <th rowspan="2">Масса вантажу, кг</th>
                  <th colspan="2">Коефіцієнт використання</th>
                  <th rowspan="2">Примітки</th>
                </tr>
                <tr>
                  <th class="font-italic">L</th>
                  <th class="font-italic">B</th>
                  <th class="font-italic">H</th>
                  <th class="font-italic">
                    <BaseKatex v-bind:formula="'N_{заг}'"></BaseKatex>
                  </th>
                  <th class="font-italic">
                    <BaseKatex v-bind:formula="'\\gamma_{ст}'"></BaseKatex>
                  </th>
                  <th class="font-italic">
                    <BaseKatex v-bind:formula="'\\eta_{s}'"></BaseKatex>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result, index) in results" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td class="font-italic">
                    <BaseKatex v-bind:formula="result.scheme"></BaseKatex>
                  </td>
                  <td>{{ result.boxCountL }}</td>
                  <td>{{ result.boxCountB }}</td>
                  <td>{{ result.boxCountH }}</td>
                  <td>{{ result.boxCountTotal }}</td>
                  <td>{{ result.palletWeightGross }}</td>
                  <td>{{ result.coefficientLoadCapacity }}</td>
                  <td>{{ result.coefficientAreaUsage }}</td>
                  <td>
                    <span v-if="result.recalculateCount > 0">
                      Висота навантаження зменшена на {{ $tc("row", result.recalculateCount) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.result-card {
  overflow: hidden;

  .result-table-container {
    .v-data-table__wrapper > table {
      th {
        padding-top: 16px;
        vertical-align: baseline;
      }

      th,
      td {
        border-right: thin solid rgba(0, 0, 0, 0.12);
      }
    }
    .v-data-table__wrapper > table > thead > tr:first-child > th {
      border-top: thin solid rgba(0, 0, 0, 0.12);
    }

    .v-data-table__wrapper > table > thead > tr:last-child > th {
      font-size: 14px;
    }
    .v-data-table__wrapper > table > thead > tr > th {
      border-bottom: thin solid rgba(0, 0, 0, 0.12);
    }
  }
}
</style>

<script>
import BaseKatex from "components/BaseKatex";
import WorkDescription from "components/WorkDescription";
import WorkOutput from "components/WorkOutput";
import CalculateFormationCargoUnit from "calculation/formationCargoUnit";

export default {
  name: "CalculationGraphicalWork2",
  components: {
    BaseKatex,
    WorkDescription,
    WorkOutput,
  },
  data: () => {
    return {
      description: {
        title: "Розрахунково-графічна робота",
        description: "Формування засобів укрупнення вантажного місця (ЗУВМ)",
        purpose:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed nulla eget mauris pellentesque sollicitudin. Cras posuere porttitor risus sit amet posuere.",
        tasks: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        ],
      },
      output: {
        header: ["Показник", "Умовне позначення", "Одиниці виміру", "Фактичне значення"],
        inputs: {
          palletLength: {
            name: "Довжинна піддону",
            formula: "L_п",
            units: "мм",
            value: 0,
            disabled: false,
          },
          palletWidth: {
            name: "Ширина піддону",
            formula: "B_п",
            units: "мм",
            value: 0,
            disabled: false,
          },
          palletHeight: {
            name: "Висота навантаження",
            formula: "H_п",
            units: "мм",
            value: 0,
            disabled: false,
          },
          palletCapacity: {
            name: "Вантажність піддону",
            formula: "q_п",
            units: "кг",
            value: 0,
            disabled: false,
          },
          boxLength: {
            name: "Довжина коробки",
            formula: "l",
            units: "мм",
            value: 0,
            disabled: false,
          },
          boxWidth: {
            name: "Ширина коробки",
            formula: "b",
            units: "мм",
            value: 0,
            disabled: false,
          },
          boxHeight: {
            name: "Висота коробки",
            formula: "h",
            units: "мм",
            value: 0,
            disabled: false,
          },
          boxWeight: {
            name: "Вага коробки",
            formula: "m",
            units: "кг",
            value: 0,
            disabled: false,
          },
        },
      },
      results: [],
    };
  },
  methods: {
    onOutputSubmit() {
      this.calculate();
    },
    calculate() {
      const calculateFormationCargoUnitV2 = new CalculateFormationCargoUnit(
        this.output.inputs.palletLength.value,
        this.output.inputs.palletWidth.value,
        this.output.inputs.palletHeight.value,
        this.output.inputs.palletCapacity.value,
        this.output.inputs.boxLength.value,
        this.output.inputs.boxWidth.value,
        this.output.inputs.boxHeight.value,
        this.output.inputs.boxWeight.value
      );

      this.results = calculateFormationCargoUnitV2.calculate();
      console.log(calculateFormationCargoUnitV2.calculate());
    },
  },
};
</script>
