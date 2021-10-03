export function roundTo(number, decimals) {
  return Math.round(10 ** decimals * number) / 10 ** decimals;
}
