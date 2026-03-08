import { useState } from "react"
import CalculatorLayout from "../components/CalculatorLayout"

function HousingLevy() {
  const [gross, setGross] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const levy = Number(gross) * 0.015
    setResult(levy)
  }

  return (
    <CalculatorLayout title="Housing Levy Calculator">

      <input
        className="w-full p-4 border rounded-xl mb-4"
        placeholder="Enter Gross Salary"
        value={gross}
        onChange={e => setGross(e.target.value)}
      />

      <button
        onClick={calculate}
        className="w-full bg-green-600 text-white p-4 rounded-xl"
      >
        Calculate
      </button>

      {result !== null && (
        <p className="mt-6 font-bold">
          Housing Levy: KES {result.toFixed(2)}
        </p>
      )}

    </CalculatorLayout>
  )
}

export default HousingLevy