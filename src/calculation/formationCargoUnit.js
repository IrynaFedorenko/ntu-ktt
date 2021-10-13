import { roundTo } from "./math";

class CalculateFormationCargoUnit {
  constructor(L, B, H, palletCapacity, l, b, h, boxWeight) {
    this.L = L;
    this.B = B;
    this.H = H;
    this.l = l;
    this.b = b;
    this.h = h;
    this.palletCapacity = palletCapacity;
    this.boxWeight = boxWeight;
  }

  calculate() {
    const { L_to_l, L_to_b, L_to_h, B_to_l, B_to_b, B_to_h, H_to_l, H_to_b, H_to_h } =
      this.getBoxCountForEachLocationVariant();

    return [
      this.calculateOneLocationVariant("L_п/l, B_п/b, H_п/h", L_to_l, B_to_b, H_to_h),
      this.calculateOneLocationVariant("L_п/l, B_п/h, H_п/b", L_to_l, B_to_h, H_to_b),
      this.calculateOneLocationVariant("L_п/b, B_п/l, H_п/h", L_to_b, B_to_l, H_to_h),
      this.calculateOneLocationVariant("L_п/b, B_п/h, H_п/l", L_to_b, B_to_h, H_to_l),
      this.calculateOneLocationVariant("L_п/h, B_п/b, H_п/l", L_to_h, B_to_b, H_to_l),
      this.calculateOneLocationVariant("L_п/h, B_п/l, H_п/b", L_to_h, B_to_l, H_to_b),
    ];
  }

  getBoxCountForEachLocationVariant() {
    return {
      L_to_l: Math.floor(this.L / this.l) || 0,
      L_to_b: Math.floor(this.L / this.b) || 0,
      L_to_h: Math.floor(this.L / this.h) || 0,
      B_to_l: Math.floor(this.B / this.l) || 0,
      B_to_b: Math.floor(this.B / this.b) || 0,
      B_to_h: Math.floor(this.B / this.h) || 0,
      H_to_l: Math.floor(this.H / this.l) || 0,
      H_to_b: Math.floor(this.H / this.b) || 0,
      H_to_h: Math.floor(this.H / this.h) || 0,
    };
  }

  calculateOneLocationVariant(scheme, boxCountL, boxCountB, boxCountH, recalculateCount = 0) {
    const boxCountTotal = boxCountL * boxCountB * boxCountH;
    const palletWeightGross = boxCountTotal * this.boxWeight;
    const coefficientAreaUsage = roundTo((this.l * this.b * boxCountL * boxCountB) / (this.L * this.B), 2) || 0;
    const coefficientLoadCapacity = roundTo(palletWeightGross / this.palletCapacity, 2) || 0;

    const returnObj = {
      scheme,
      boxCountL,
      boxCountB,
      boxCountH,
      boxCountTotal,
      coefficientAreaUsage,
      palletWeightGross,
      coefficientLoadCapacity,
      recalculateCount,
    };

    if (coefficientLoadCapacity > 1 && boxCountH > 1) {
      return this.calculateOneLocationVariant(scheme, boxCountL, boxCountB, boxCountH - 1, recalculateCount + 1);
    }

    return returnObj;
  }
}

export default CalculateFormationCargoUnit;
