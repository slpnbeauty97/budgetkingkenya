import { useState } from "react"
import { calculateNetPay } from "../calculators/netPay"

function NetPay() {
  const [gross, setGross] = useState("")
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    const calculation = calculateNetPay(Number(gross))
    setResult(calculation)
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Kenya Net Pay Calculator (2026 Updated)
      </h1>

      <input
        type="number"
        placeholder="Enter Gross Salary"
        className="w-full p-3 border rounded mb-4"
        value={gross}
        onChange={(e) => setGross(e.target.value)}
      />

      <button
        onClick={handleCalculate}
        className="w-full bg-green-600 text-white p-3 rounded"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 border p-4 rounded">
          <p>PAYE: KES {result.paye.toFixed(2)}</p>
          <p>NSSF: KES {result.nssf.toFixed(2)}</p>
          <p>SHIF: KES {result.shif.toFixed(2)}</p>
          <p>Housing Levy: KES {result.housingLevy.toFixed(2)}</p>
          <hr className="my-2" />
          <p className="font-bold">
            Net Pay: KES {result.netPay.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}

export default NetPay