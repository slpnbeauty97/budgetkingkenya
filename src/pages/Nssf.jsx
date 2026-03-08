import { useState } from "react"
import CalculatorLayout from "../components/CalculatorLayout"

function Nssf() {
  const [gross, setGross] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const pensionable = Math.min(Number(gross), 108000)
    const nssf = pensionable * 0.06
    setResult(nssf)
  }

  return (
    <CalculatorLayout title="NSSF Calculator">

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
          NSSF Contribution: KES {result.toFixed(2)}
        </p>
      )}

    </CalculatorLayout>
  )
}

export default Nssf