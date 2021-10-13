import Vue from "vue";
import VueRouter from "vue-router";
import Home from "views/Home.vue";
import FormationCargoUnit from "views/FormationCargoUnit";
import AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle from "views/AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/formation-cargo-unit",
    name: "FormationCargoUnit",
    component: FormationCargoUnit,
  },
  {
    path: "/analysis-technical-and-operating-characteristics-motor-vehicle",
    name: "AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle",
    component: AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
