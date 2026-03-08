import { Link } from "react-router-dom"

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            BudgetKing Kenya
          </Link>

          <div className="space-x-6 text-sm text-muted">
            <Link to="/net-pay">Salary</Link>
            <Link to="/vat">Tax</Link>
            <Link to="/loan">Loans</Link>
            <Link to="/business-profit">Business</Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-muted">
          © 2026 BudgetKing Kenya — Financial Tools for Kenyans
        </div>
      </footer>

    </div>
  )
}

export default Layout