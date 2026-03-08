import { useState } from "react"
import CalculatorLayout from "../components/CalculatorLayout"

function Loan() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const p = Number(principal)
    const r = Number(rate) / 100 / 12
    const n = Number(years) * 12

    if (!p || !r || !n) return

    const payment =
      (p * r) /
      (1 - Math.pow(1 + r, -n))

    setResult(payment)
  }

  return (
    <CalculatorLayout title="Loan Calculator">

      <input className="w-full p-4 border rounded-xl mb-4"
        placeholder="Loan Principal"
        value={principal}
        onChange={e => setPrincipal(e.target.value)}
      />

      <input className="w-full p-4 border rounded-xl mb-4"
        placeholder="Annual Interest Rate %"
        value={rate}
        onChange={e => setRate(e.target.value)}
      />

      <input className="w-full p-4 border rounded-xl mb-4"
        placeholder="Loan Duration (Years)"
        value={years}
        onChange={e => setYears(e.target.value)}
      />

      <button
        onClick={calculate}
        className="w-full bg-green-600 text-white p-4 rounded-xl"
      >
        Calculate
      </button>

      {result !== null && (
        <p className="mt-6 font-bold">
          Monthly Payment: KES {result.toFixed(2)}
        </p>
      )}

    </CalculatorLayout>
  )
}

export default Loan