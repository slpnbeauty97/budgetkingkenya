import { useState } from "react"
import CalculatorLayout from "../components/CalculatorLayout"

function Vat() {
  const [amount, setAmount] = useState("")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const vat = Number(amount) * 0.16
    const total = Number(amount) + vat

    setResult({ vat, total })
  }

  return (
    <CalculatorLayout title="VAT Calculator">

      <input
        className="w-full p-4 border rounded-xl mb-4"
        placeholder="Enter Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button
        onClick={calculate}
        className="w-full bg-green-600 text-white p-4 rounded-xl"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 space-y-2 font-semibold">
          <p>VAT: KES {result.vat.toFixed(2)}</p>
          <p>Total: KES {result.total.toFixed(2)}</p>
        </div>
      )}

    </CalculatorLayout>
  )
}

export default Vat