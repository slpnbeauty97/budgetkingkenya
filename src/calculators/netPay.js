export function calculateNetPay(grossSalary) {
  let paye = grossSalary * 0.30
  let nssf = 1080
  let shif = grossSalary * 0.0275
  let housingLevy = grossSalary * 0.015

  let totalDeductions = paye + nssf + shif + housingLevy
  let netPay = grossSalary - totalDeductions

  return {
    paye,
    nssf,
    shif,
    housingLevy,
    netPay
  }
}