import { roundTo } from "./math";

export default function calculateFormationCargoUnit(L, B, H, palletWeight, palletCapacity, l, b, h, boxWeight) {
  const boxCountL_to_l = Math.floor(L / l) || 0;
  const boxCountL_to_b = Math.floor(L / b) || 0;
  const boxCountL_to_h = Math.floor(L / h) || 0;
  const boxCountB_to_l = Math.floor(B / l) || 0;
  const boxCountB_to_b = Math.floor(B / b) || 0;
  const boxCountB_to_h = Math.floor(B / h) || 0;
  const boxCountH_to_l = Math.floor(H / l) || 0;
  const boxCountH_to_b = Math.floor(H / b) || 0;
  const boxCountH_to_h = Math.floor(H / h) || 0;

  const boxCountTotal = [];
  boxCountTotal.push(boxCountL_to_l * boxCountB_to_b * boxCountH_to_h);
  boxCountTotal.push(boxCountL_to_l * boxCountB_to_h * boxCountH_to_b);
  boxCountTotal.push(boxCountL_to_b * boxCountB_to_l * boxCountH_to_h);
  boxCountTotal.push(boxCountL_to_b * boxCountB_to_h * boxCountH_to_l);
  boxCountTotal.push(boxCountL_to_h * boxCountB_to_b * boxCountH_to_l);
  boxCountTotal.push(boxCountL_to_h * boxCountB_to_l * boxCountH_to_b);

  const coefficientAreaUsage = [];
  coefficientAreaUsage.push(roundTo((l * b * boxCountL_to_l * boxCountB_to_b) / (L * B), 2));
  coefficientAreaUsage.push(roundTo((l * h * boxCountL_to_l * boxCountB_to_h) / (L * B), 2));
  coefficientAreaUsage.push(roundTo((b * l * boxCountL_to_b * boxCountB_to_l) / (L * B), 2));
  coefficientAreaUsage.push(roundTo((b * h * boxCountL_to_b * boxCountB_to_h) / (L * B), 2));
  coefficientAreaUsage.push(roundTo((h * b * boxCountL_to_h * boxCountB_to_b) / (L * B), 2));
  coefficientAreaUsage.push(roundTo((h * l * boxCountL_to_h * boxCountB_to_l) / (L * B), 2));

  const resultsByVariants = [];
  for (let i = 0; i < 6; i++) {
    let resultObj = getBaseResultObject();
    resultObj.boxCountTotal = boxCountTotal[i];
    resultObj.palletWeightGross = resultObj.boxCountTotal * boxWeight + palletWeight;
    resultObj.coefficientLoadCapacity = roundTo(resultObj.palletWeightGross / palletCapacity, 2) || 0;
    resultObj.coefficientAreaUsage = coefficientAreaUsage[i] || 0;

    resultsByVariants.push(resultObj);
  }

  return {
    resultsByVariants,
    values: {
      boxCountL_to_l,
      boxCountL_to_b,
      boxCountL_to_h,
      boxCountB_to_l,
      boxCountB_to_b,
      boxCountB_to_h,
      boxCountH_to_l,
      boxCountH_to_b,
      boxCountH_to_h,
    },
  };
}

function getBaseResultObject() {
  return {
    boxCountTotal: 0,
    palletWeightGross: 0,
    coefficientLoadCapacity: 0,
    coefficientAreaUsage: 0,
  };
}
