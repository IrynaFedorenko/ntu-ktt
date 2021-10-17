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
                  <th>Показник</th>
                  <th>Умовне позначення</th>
                  <th>Формула</th>
                  <th>Одиниці виміру</th>
                  <th>Розраховане значення</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result, index) in results" :key="index">
                  <td>{{ result.name }}</td>
                  <td><BaseKatex v-bind:formula="result.shorthand"></BaseKatex></td>
                  <td><BaseKatex v-bind:formula="result.formula"></BaseKatex></td>
                  <td><BaseKatex v-bind:formula="result.units" v-bind:font-size="'14'"></BaseKatex></td>
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
.result-card {
  overflow: hidden;

  .result-table-container {
    .v-data-table__wrapper > table {
      th {
        padding: 8px 16px;
        vertical-align: baseline;
      }
      th,
      td {
        border-right: thin solid rgba(0, 0, 0, 0.12);
        padding: 8px 16px;

        &:nth-of-type(3) {
          min-width: 300px;
        }
      }
    }
    .v-data-table__wrapper > table > thead > tr:first-child > th {
      border-top: thin solid rgba(0, 0, 0, 0.12);
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
        title: "Практична робота",
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
          l_b: {
            name: "Внутрішня довжина кузова АТЗ",
            formula: "l_в",
            units: "м",
            value: 5,
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
          Q_l: {
            name: "Лінійна норма витрати палива",
            formula: "Q_л",
            units: "л/100км",
            value: 22,
          },
          Q_lt: {
            name: "Лінійна норма витрати палива тягача",
            formula: "Q_лт",
            units: "л/100км",
            value: 22,
          },
          H_p: {
            name: "Норма витрати палива на 1т спорядженої маси (питома витрата палива)",
            formula: "H_n",
            formulaDescription: [
              {
                texts: ["", "для АТЗ з карбюроторним двигуном"],
                formulas: ["H_п = 2,"],
              },
              {
                texts: ["", "для АТЗ з дизельним двигуном"],
                formulas: ["H_п = 1.3,"],
              },
              {
                texts: ["", "для сучасних вантажних АТЗ при магістральних перевезеннях"],
                formulas: ["H_п = 0.6-0.8,"],
              },
            ],
            units: "л/100ткм",
            value: 1.3,
          },
          G_0p: {
            name: "Споряджена маса причепа (напівпричепа)",
            formula: "G_{0п}",
            units: "т",
            value: 2,
          },
          L: {
            name: "Пробіг АТЗ",
            formula: "L",
            units: "км",
            value: 100,
          },
          gamma_st: {
            name: "Коефіцієнт статичного використання вантажопідйомності АТЗ",
            formula: "\\gamma_{ст}",
            units: "",
            value: 1,
          },
          beta: {
            name: "Коефіцієнт пробігу АТЗ",
            formula: "\\beta",
            units: "",
            value: 0.5,
          },
          K_d: {
            name: "Коефіцієнт дорожніх умов руху",
            formula: "K_д",
            units: "",
            value: 0.85,
          },
          V_b: {
            name: "Об'єм паливного баку",
            formula: "V_б",
            units: "л",
            value: 200,
          },
          N: {
            name: "Максимальна потужність двигуна,",
            formula: "N",
            units: "кВт (к.с.)",
            value: 240,
          },
          M_a: {
            name: "Повна маса АТЗ",
            formula: "M_a",
            units: "т",
            value: 18,
          },
          M_1: {
            name: "Маса, яка приходиться на першу вісь",
            formula: "M_1",
            units: "т",
            value: 3,
          },
          M_2: {
            name: "Маса, яка приходиться на другу вісь",
            formula: "M_2",
            units: "т",
            value: 10,
          },
          M_3: {
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
        this.output.inputs.B_a.value,
        this.output.inputs.l_b.value,
        this.output.inputs.Q_l.value,
        this.output.inputs.Q_lt.value,
        this.output.inputs.H_p.value,
        this.output.inputs.G_0p.value,
        this.output.inputs.L.value,
        this.output.inputs.gamma_st.value,
        this.output.inputs.beta.value,
        this.output.inputs.K_d.value,
        this.output.inputs.V_b.value,
        this.output.inputs.N.value,
        this.output.inputs.M_a.value,
        this.output.inputs.M_1.value,
        this.output.inputs.M_2.value,
        this.output.inputs.M_3.value
      );

      this.results = calculationClass.calculate();
    },
  },
};
</script>
