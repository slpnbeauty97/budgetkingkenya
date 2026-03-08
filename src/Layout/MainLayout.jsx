import { Link, Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold">
              K
            </div>
            <span className="font-semibold text-lg tracking-wide">
              BudgetKing
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm text-gray-400">
<Link to="/budget" className="hover:text-white transition">
  Budget
</Link>
            <Link to="/netpay" className="hover:text-white transition">Net Pay</Link>
            <Link to="/paye" className="hover:text-white transition">PAYE</Link>
            <Link to="/vat" className="hover:text-white transition">VAT</Link>
            <Link to="/loan" className="hover:text-white transition">Loan</Link>
          </nav>

          <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-xl text-sm font-semibold transition">
            Install App
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  )
}