import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"

import Budget from "./pages/Budget"
import Home from "./pages/Home"
import NetPay from "./pages/NetPay"
import Paye from "./pages/Paye"
import Vat from "./pages/Vat"
import Loan from "./pages/Loan"
import HousingLevy from "./pages/HousingLevy"
import Nssf from "./pages/Nssf"
import BusinessProfit from "./pages/BusinessProfit"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
<Route path="/budget" element={<Budget />} />
          <Route path="/netpay" element={<NetPay />} />
          <Route path="/paye" element={<Paye />} />
          <Route path="/vat" element={<Vat />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/housing" element={<HousingLevy />} />
          <Route path="/nssf" element={<Nssf />} />
          <Route path="/business" element={<BusinessProfit />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default App