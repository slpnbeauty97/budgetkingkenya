import { Link } from "react-router-dom"
import { useState } from "react"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    ["Home", "/"],
    ["Net Pay", "/netpay"],
    ["PAYE", "/paye"],
    ["VAT", "/vat"],
    ["Loan", "/loan"],
    ["Investments, "investments"],
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-800/90 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold">Kenya Calc</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(([name, path]) => (
              <Link
                key={path}
                to={path}
                className="hover:text-green-400 transition font-semibold"
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            {navLinks.map(([name, path]) => (
              <Link
                key={path}
                to={path}
                className="block px-6 py-3 hover:bg-gray-700 transition"
                onClick={() => setMenuOpen(false)} // close on click
              >
                {name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="pt-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
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

        {/* Right Side */}
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
    </div>
  )
}