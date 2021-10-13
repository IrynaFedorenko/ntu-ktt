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
                  <th rowspan="2">Показник</th>
                  <th rowspan="2">Умовне позначення</th>
                  <th colspan="2">Хід роботи</th>
                  <th rowspan="2">Одиниці виміру</th>
                  <th rowspan="2">Розраховане значення</th>
                </tr>
                <tr>
                  <th>Формула</th>
                  <th>Пояснення</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result, index) in results" :key="index">
                  <td>{{ result.name }}</td>
                  <td><BaseKatex v-bind:formula="result.shorthand"></BaseKatex></td>
                  <td><BaseKatex v-bind:formula="result.formula"></BaseKatex></td>
                  <td>{{ result.formulaDescription }}</td>
                  <td><BaseKatex v-bind:formula="result.units"></BaseKatex></td>
                  <td>{{ result.value }}</td>
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
  .v-data-table__wrapper > table > thead > tr > th {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }
}
</style>

<script>
import BaseKatex from "components/BaseKatex";
import WorkDescription from "components/WorkDescription";
import WorkOutput from "components/WorkOutput";
import AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle from "calculation/analysisTechnicalAndOperatingCharacteristicsMotorVehicle";

export default {
  name: "AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle",
  components: {
    BaseKatex,
    WorkDescription,
    WorkOutput,
  },
  data: () => {
    return {
      description: {
        title: "Практична робота №1",
        description: "Аналіз техніко-експлуатаційних характеристик АТЗ",
        purpose:
          "Вибір рухомого складу з урахуванням виду винтажу, розміру партії, дальності, схеми доставки, а також дорожніх та транспортних умов перевезення.",
        tasks: [
          "Описати принципи вибору рухомого складу і їх використання стосовно задачі.",
          "Виписати з довідника основні технічні характеристики автомобіля.",
          "Визначити показники техніко-експлуатаційних характеристик (ТЕХ) АТЗ.",
        ],
      },
      output: {
        header: ["Показник", "Умовне позначення", "Одиниці виміру", "Фактичне значення"],
        inputs: {
          q: {
            name: "Номінальна вантажопідйомність",
            formula: "q",
            units: "т",
            value: 12,
          },
          V_v: {
            name: "Внутрішній об'єм кузова",
            formula: "V_в",
            units: "м^3",
            value: 10,
          },
          q3: {
            name: "Внутрішня довжина кузова АТЗ",
            formula: "l_в",
            units: "м",
            value: 5,
          },
          q41: {
            name: "Навантажувальна висота підлоги кузова",
            formula: "h_п",
            units: "м",
            value: 0.7,
          },
          q_0: {
            name: "Споряджена маса АТЗ",
            formula: "q_0",
            units: "т",
            value: 6,
          },
          L_a: {
            name: "Довжина АТЗ",
            formula: "L_a",
            units: "м",
            value: 7,
          },
          B_a: {
            name: "Ширина АТЗ",
            formula: "B_a",
            units: "м",
            value: 2.5,
          },
          q7: {
            name: "Мінімальний радіус повороту",
            formula: "R_n",
            units: "м",
            value: 10,
          },
          q8: {
            name: "Контрольна витрата палива, л/100км",
            formula: "Q_к",
            units: "л/100км",
            value: 20,
          },
          q9: {
            name: "Лінійна норма витрати палива",
            formula: "Q_л",
            units: "л/100км",
            value: 22,
          },
          q10: {
            name: "Лінійна норма витрати палива тягача",
            formula: "Q_лт",
            units: "л/100км",
            value: 22,
          },
          q11: {
            name: "Норма витрати палива на 1т спорядженої маси (питома витрата палива)",
            formula: "H_n",
            units: "л/100ткм",
            value: 1.3,
          },
          q12: {
            name: "Споряджена маса причепа (напівпричепа)",
            formula: "B_a",
            units: "т",
            value: 2,
          },
          q13: {
            name: "Пробіг АТЗ",
            formula: "L",
            units: "км",
            value: 100,
          },
          q14: {
            name: "Коефіцієнт статичного використання вантажопідйомності АТЗ",
            formula: "\\gamma_ст",
            units: "",
            value: 1,
          },
          q15: {
            name: "Коефіцієнт пробігу АТЗ",
            formula: "\\beta",
            units: "",
            value: 0.5,
          },
          q16: {
            name: "Коефіцієнт дорожніх умов руху",
            formula: "",
            units: "",
            value: 0.85,
          },
          q17: {
            name: "Об'єм паливного баку",
            formula: "",
            units: "л",
            value: 200,
          },
          q18: {
            name: "Максимальна потужність двигуна,",
            formula: "N",
            units: "кВт (к.с.)",
            value: 240,
          },
          q19: {
            name: "Повна маса АТЗ",
            formula: "G",
            units: "т",
            value: 18,
          },
          q20: {
            name: "Маса, яка приходиться на першу вісь",
            formula: "M_1",
            units: "т",
            value: 3,
          },
          q21: {
            name: "Маса, яка приходиться на другу вісь",
            formula: "M_2",
            units: "т",
            value: 10,
          },
          q22: {
            name: "Маса, яка приходиться на третю вісь",
            formula: "M_3",
            units: "т",
            value: 5,
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
      const calculationClass = new AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle(
        this.output.inputs.q.value,
        this.output.inputs.V_v.value,
        this.output.inputs.q_0.value,
        this.output.inputs.L_a.value,
        this.output.inputs.B_a.value
      );

      this.results = calculationClass.calculate();
    },
  },
};
</script>
