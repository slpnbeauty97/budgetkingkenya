import CalculatorLayout from "../components/CalculatorLayout"
import { useState } from "react"

function BusinessProfit() {
  const [revenue, setRevenue] = useState("")
  const [expenses, setExpenses] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const r = Number(revenue)
    const e = Number(expenses)

    const profit = r - e
    const margin = r ? (profit / r) * 100 : 0

    setResult({ profit, margin })
  }

  return (
    <CalculatorLayout title="Business Profit Calculator">

      <input
        className="w-full p-4 border rounded-xl mb-4"
        placeholder="Monthly Revenue"
        value={revenue}
        onChange={e => setRevenue(e.target.value)}
      />

      <input
        className="w-full p-4 border rounded-xl mb-4"
        placeholder="Monthly Expenses"
        value={expenses}
        onChange={e => setExpenses(e.target.value)}
      />

      <button
        onClick={calculate}
        className="w-full bg-green-600 text-white p-4 rounded-xl"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6">
          <p>Profit: KES {result.profit.toFixed(2)}</p>
          <p>Margin: {result.margin.toFixed(2)}%</p>
        </div>
      )}

    </CalculatorLayout>
  )
}

export default BusinessProfit