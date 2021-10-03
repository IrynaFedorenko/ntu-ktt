<template>
  <v-container>
    <WorkDescription v-bind:description="description"></WorkDescription>
    <WorkOutput v-bind:output="output" v-on:submit="onOutputSubmit"></WorkOutput>

    <v-row>
      <v-col cols="12">
        <v-card elevation="6">
          <v-card-title>Результати розрахунку</v-card-title>
          <v-simple-table class="result-table-container">
            <template v-slot:default>
              <thead>
                <tr>
                  <th rowspan="2">№ п/п</th>
                  <th rowspan="2">Cхема розміщення</th>
                  <th colspan="4">Кількість одиниць, шт</th>
                  <th rowspan="2">Масса брутто піддону, кг</th>
                  <th colspan="2">Коефіцієнт використання</th>
                </tr>
                <tr>
                  <th class="font-italic">L</th>
                  <th class="font-italic">B</th>
                  <th class="font-italic">H</th>
                  <th class="font-italic">
                    <BaseMathjax v-bind:formula="'$$N_{заг}$$'"></BaseMathjax>
                  </th>
                  <th class="font-italic">
                    <BaseMathjax v-bind:formula="'$$\\gamma_{ст}$$'"></BaseMathjax>
                  </th>
                  <th class="font-italic">
                    <BaseMathjax v-bind:formula="'$$\\eta_{s}$$'"></BaseMathjax>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result, index) in results.resultsByVariants" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td class="font-italic">
                    <BaseMathjax v-bind:formula="result.scheme"></BaseMathjax>
                  </td>
                  <td>{{ result.boxCount.L }}</td>
                  <td>{{ result.boxCount.B }}</td>
                  <td>{{ result.boxCount.H }}</td>
                  <td>{{ result.boxCountTotal }}</td>
                  <td>{{ result.palletWeightGross }}</td>
                  <td>{{ result.coefficientLoadCapacity }}</td>
                  <td>{{ result.coefficientAreaUsage }}</td>
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
.output-data-container {
  .v-data-table {
    padding-bottom: 16px;
  }
  tr > td {
    vertical-align: baseline;
  }
}

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
</style>

<script>
import BaseMathjax from "components/BaseMathjax";
import WorkDescription from "components/WorkDescription";
import WorkOutput from "components/WorkOutput";
import calculateFormationCargoUnit from "calculation/formationCargoUnit";

export default {
  name: "CalculationGraphicalWork2",
  components: {
    BaseMathjax,
    WorkDescription,
    WorkOutput,
  },
  data: () => {
    return {
      description: {
        title: "Розрахунково-графічна робота №2",
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
            formula: "$$L_п$$",
            units: "мм",
            value: 0,
            disabled: false,
          },
          palletWidth: {
            name: "Ширина піддону",
            formula: "$$B_п$$",
            units: "мм",
            value: 0,
            disabled: false,
          },
          palletHeight: {
            name: "Висота піддону",
            formula: "$$H_п$$",
            units: "мм",
            value: 0,
            disabled: false,
          },
          palletWeight: {
            name: "Вага піддону",
            formula: "$$m_п$$",
            units: "кг",
            value: 0,
            disabled: false,
          },
          palletCapacity: {
            name: "Вантажність піддону",
            formula: "$$q_п$$",
            units: "кг",
            value: 0,
            disabled: false,
          },
          boxLength: {
            name: "Довжина коробки",
            formula: "$$l$$",
            units: "мм",
            value: 0,
            disabled: false,
          },
          boxWidth: {
            name: "Ширина коробки",
            formula: "$$b$$",
            units: "мм",
            value: 0,
            disabled: false,
          },
          boxHeight: {
            name: "Висота коробки",
            formula: "$$h$$",
            units: "мм",
            value: 0,
            disabled: false,
          },
          boxWeight: {
            name: "Вага коробки",
            formula: "$$m$$",
            units: "кг",
            value: 0,
            disabled: false,
          },
        },
      },
      resultHeader: ["Показник", "Умовне позначення", "Одиниці виміру", "Розраховане значення"],
      results: [],
    };
  },
  methods: {
    onOutputSubmit() {
      this.calculate();
    },
    calculate() {
      const calculationResults = calculateFormationCargoUnit(
        this.output.inputs.palletLength.value,
        this.output.inputs.palletWidth.value,
        this.output.inputs.palletHeight.value,
        this.output.inputs.palletWeight.value,
        this.output.inputs.palletCapacity.value,
        this.output.inputs.boxLength.value,
        this.output.inputs.boxWidth.value,
        this.output.inputs.boxHeight.value,
        this.output.inputs.boxWeight.value
      );

      calculationResults.resultsByVariants[0].scheme = "$$L_п/l, B_п/b, H_п/h$$";
      calculationResults.resultsByVariants[1].scheme = "$$L_п/l, B_п/h, H_п/b$$";
      calculationResults.resultsByVariants[2].scheme = "$$L_п/b, B_п/l, H_п/h$$";
      calculationResults.resultsByVariants[3].scheme = "$$L_п/b, B_п/h, H_п/l$$";
      calculationResults.resultsByVariants[4].scheme = "$$L_п/h, B_п/b, H_п/l$$";
      calculationResults.resultsByVariants[5].scheme = "$$L_п/h, B_п/l, H_п/b$$";

      calculationResults.resultsByVariants[0].boxCount = {
        L: calculationResults.values.boxCountL_to_l,
        B: calculationResults.values.boxCountB_to_b,
        H: calculationResults.values.boxCountH_to_h,
      };
      calculationResults.resultsByVariants[1].boxCount = {
        L: calculationResults.values.boxCountL_to_l,
        B: calculationResults.values.boxCountB_to_h,
        H: calculationResults.values.boxCountH_to_b,
      };
      calculationResults.resultsByVariants[2].boxCount = {
        L: calculationResults.values.boxCountL_to_b,
        B: calculationResults.values.boxCountB_to_l,
        H: calculationResults.values.boxCountH_to_h,
      };
      calculationResults.resultsByVariants[3].boxCount = {
        L: calculationResults.values.boxCountL_to_b,
        B: calculationResults.values.boxCountB_to_h,
        H: calculationResults.values.boxCountH_to_l,
      };
      calculationResults.resultsByVariants[4].boxCount = {
        L: calculationResults.values.boxCountL_to_h,
        B: calculationResults.values.boxCountB_to_b,
        H: calculationResults.values.boxCountH_to_l,
      };
      calculationResults.resultsByVariants[5].boxCount = {
        L: calculationResults.values.boxCountL_to_h,
        B: calculationResults.values.boxCountB_to_l,
        H: calculationResults.values.boxCountH_to_b,
      };

      this.results = calculationResults;
    },
  },
};
</script>
