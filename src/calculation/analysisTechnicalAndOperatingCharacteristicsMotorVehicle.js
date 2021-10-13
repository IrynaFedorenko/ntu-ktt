import { roundTo } from "./math";

class AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle {
  constructor(q, V_v, q_0, L_a, B_a) {
    this.q = q;
    this.V_v = V_v;
    this.q_0 = q_0;
    this.L_a = L_a;
    this.B_a = B_a;
  }

  calculate() {
    return [
      this.getSpecificVolumetricLoadCapacity(),
      this.getCoefficientOfEquippedMass(),
      this.getIndicatorOfCompactness(),
    ];
  }

  getSpecificVolumetricLoadCapacity() {
    const obj = this.getBaseObject();
    obj.name = "Питома об'ємна вантажопідйомність";
    obj.shorthand = "\\gamma_n";
    obj.formula = "\\cfrac{q_0}{q}";
    obj.value = roundTo(this.q / this.V_v, 2);

    return obj;
  }

  getCoefficientOfEquippedMass() {
    const obj = this.getBaseObject();
    obj.name = "Коефіцієнт спорядженої маси";
    obj.shorthand = "\\eta_q";
    obj.formula = "\\cfrac{q}{V_в}";
    obj.units = "т/м^3";
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

  getBaseObject() {
    return {
      name: "",
      shorthand: "",
      formula: "",
      formulaDescription: "",
      units: "",
      value: 0,
    };
  }
}

export default AnalysisTechnicalAndOperatingCharacteristicsMotorVehicle;
