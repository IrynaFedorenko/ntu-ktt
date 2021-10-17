import { roundTo } from "./math";

class AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle {
  constructor(q, V_v, q_0, L_a, B_a, l_b, Q_l, Q_lt, H_p, G_0p, L, gamma_st, beta, K_d, V_b, N, M_a, M_1, M_2, M_3) {
    this.H = undefined;

    this.q = q;
    this.V_v = V_v;
    this.q_0 = q_0;
    this.L_a = L_a;
    this.B_a = B_a;
    this.l_b = l_b;
    this.Q_l = Q_l;
    this.Q_lt = Q_lt;
    this.H_p = H_p;
    this.G_0p = G_0p;
    this.L = L;
    this.gamma_st = gamma_st;
    this.beta = beta;
    this.K_d = K_d;
    this.V_b = V_b;
    this.N = N;
    this.M_a = M_a;
    this.M_1 = M_1;
    this.M_2 = M_2;
    this.M_3 = M_3;
  }

  calculate() {
    this.setTotalRateOfFuelConsumptionPer100km();

    return [
      this.getSpecificVolumetricLoadCapacity(),
      this.getCoefficientOfEquippedMass(),
      this.getIndicatorOfCompactness(),
      this.getCoefficientOfUseOfOverallLength(),
      this.getLinearRateOfFuelConsumptionForATZ(),
      this.getLinearRateOfFuelConsumptionForTruck(),
      this.getTotalRateOfFuelConsumptionPer100km(),
      this.getFuelRange(),
      this.getFuelConsumptionPerUnit(),
      this.getSpecificEnginePower(),
      this.getWeightDistributionCoefficientByAxis1(),
      this.getWeightDistributionCoefficientByAxis2(),
      this.getWeightDistributionCoefficientByAxis3(),
    ];
  }

  getSpecificVolumetricLoadCapacity() {
    const obj = this.getBaseObject();
    obj.name = "Питома об'ємна вантажопідйомність";
    obj.shorthand = "\\gamma_n";
    // obj.formula = "\\cfrac{q_0}{q}";
    obj.formula = "\\cfrac{q}{V_в}";
    obj.units = "т/м^3";
    obj.value = roundTo(this.q / this.V_v, 2);

    return obj;
  }

  getCoefficientOfEquippedMass() {
    const obj = this.getBaseObject();
    obj.name = "Коефіцієнт спорядженої маси";
    obj.shorthand = "\\eta_q";
    obj.formula = "\\cfrac{q_0}{q}";
    obj.value = roundTo(this.q_0 / this.q, 2);

    return obj;
  }

  getIndicatorOfCompactness() {
    const obj = this.getBaseObject();
    obj.name = "Показник компактності";
    obj.shorthand = "\\lambda_S";
    obj.formula = "\\cfrac{L_a \\cdot B_a}{q}";
    obj.units = "м^2/т";
    obj.value = roundTo((this.L_a * this.B_a) / this.q, 2);

    return obj;
  }

  getCoefficientOfUseOfOverallLength() {
    const obj = this.getBaseObject();
    obj.name = "Коефіцієнт використання габаритної довжини";
    obj.shorthand = "\\lambda_в";
    obj.formula = "\\cfrac{l_в}{L_a}";
    obj.value = roundTo(this.l_b / this.L_a, 2);

    return obj;
  }

  getLinearRateOfFuelConsumptionForATZ() {
    const obj = this.getBaseObject();
    obj.name = "Лінійна норма витрати палива для АТЗ, які працюють за погодинною оплатою";
    obj.shorthand = "Q_{л}";
    obj.formula = "1.1 \\cdot Q_л";
    obj.units = "л/100км";
    obj.value = roundTo(1.1 * this.Q_l, 2);

    return obj;
  }

  getLinearRateOfFuelConsumptionForTruck() {
    const obj = this.getBaseObject();
    obj.name = "Лінійна норма витрати палива для автопоїзда";
    obj.shorthand = "Q_л^{ап}";
    obj.formula = "Q_{лт} + H_п \\cdot G_{0п}";
    obj.units = "л/100км";
    obj.value = roundTo(this.Q_lt + this.H_p * this.G_0p, 2);

    return obj;
  }

  setTotalRateOfFuelConsumptionPer100km() {
    this.H = (this.K_d * this.L * (this.Q_l + this.H_p * this.q * this.gamma_st * this.beta)) / 100;
  }
  getTotalRateOfFuelConsumptionPer100km() {
    const obj = this.getBaseObject();
    obj.name = "Загальна норма витрати палива на 100 км пробігу";
    obj.shorthand = "H";
    obj.formula =
      "\\cfrac{K_д \\cdot L \\cdot \\big( Q_л + H_п \\cdot q \\cdot \\gamma_{ст} \\cdot \\beta \\big)}{100}";
    obj.units = "л/100км";
    obj.value = roundTo(this.H, 2);

    return obj;
  }

  getFuelRange() {
    const obj = this.getBaseObject();
    obj.name = "Запас ходу по паливу";
    obj.shorthand = "l";
    obj.formula = "\\cfrac{100 \\cdot V_б}{H}";
    obj.units = "км";
    obj.value = roundTo((100 * this.V_b) / this.H, 2);

    return obj;
  }

  getFuelConsumptionPerUnit() {
    const obj = this.getBaseObject();
    obj.name = "Питома витрата палива";
    obj.shorthand = "Q_п";
    obj.formula = "\\cfrac{H}{q \\cdot \\gamma_{ст} \\cdot \\beta \\cdot L}";
    obj.units = "л/100км";
    obj.value = roundTo(this.H / (this.q * this.gamma_st * this.beta * this.L), 2);

    return obj;
  }

  getSpecificEnginePower() {
    const obj = this.getBaseObject();
    obj.name = "Питома потужність двигуна";
    obj.shorthand = "N_п";
    obj.formula = "\\cfrac{N}{M_a}";
    obj.units = "кВт/т (к.с./т)";
    obj.value = roundTo(this.N / this.M_a, 2);

    return obj;
  }

  getWeightDistributionCoefficientByAxis1() {
    const obj = this.getBaseObject();
    obj.name = "Коефіцієнт розподілу маси при повному завантаженні на першій осі";
    obj.shorthand = "\\eta_1";
    obj.formula = "\\cfrac{M_1}{M_a}";
    obj.units = "\\%";
    obj.value = roundTo(this.M_1 / this.M_a, 2);

    return obj;
  }

  getWeightDistributionCoefficientByAxis2() {
    const obj = this.getBaseObject();
    obj.name = "Коефіцієнт розподілу маси при повному завантаженні на другій осі";
    obj.shorthand = "\\eta_2";
    obj.formula = "\\cfrac{M_2}{M_a}";
    obj.units = "\\%";
    obj.value = roundTo(this.M_2 / this.M_a, 2);

    return obj;
  }

  getWeightDistributionCoefficientByAxis3() {
    const obj = this.getBaseObject();
    obj.name = "Коефіцієнт розподілу маси при повному завантаженні на третій осі";
    obj.shorthand = "\\eta_3";
    obj.formula = "\\cfrac{M_3}{M_a}";
    obj.units = "\\%";
    obj.value = roundTo(this.M_3 / this.M_a, 2);

    return obj;
  }

  getBaseObject() {
    return {
      name: "",
      shorthand: "",
      formula: "",
      units: "",
      value: 0,
    };
  }
}

export default AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle;
