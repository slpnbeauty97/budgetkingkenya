export function calculateVAT(amount) {
  const vat = amount * 0.16
  const total = amount + vat

  return { vat, total }
}