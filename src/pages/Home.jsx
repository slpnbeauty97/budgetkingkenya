import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">

      <div>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Kenya Financial
          <br />
          Calculator Suite
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Professional-grade salary, tax, and loan calculators built specifically for Kenya.
        </p>

        <Link
          to="/netpay"
          className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-semibold transition"
        >
          Start Calculating
        </Link>
      </div>

      <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-4">

        {[
          ["Net Pay", "/netpay"],
          ["PAYE", "/paye"],
          ["VAT", "/vat"],
          ["Loan", "/loan"],
        ].map(([name, path]) => (
          <Link
            key={path}
            to={path}
            className="block bg-gray-800 hover:bg-gray-700 transition p-4 rounded-xl border border-gray-700"
          >
            {name} Calculator
          </Link>
        ))}

      </div>

    </div>
  )
}