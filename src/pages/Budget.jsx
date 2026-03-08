import { useState } from "react"
import jsPDF from "jspdf"

/* ================= SECTION ================= */

function Section({ title, icon, children }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden shadow-xl hover:shadow-2xl transition">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 bg-[#1f2937] hover:bg-[#273549] transition"
      >
        <div className="flex items-center gap-3 font-semibold text-lg">
          <span>{icon}</span>
          {title}
        </div>

        <span className="text-gray-400 text-lg">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open && <div className="p-5 md:p-6">{children}</div>}
    </div>
  )
}

/* ================= INPUT CARD ================= */

function InputRow({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 bg-[#0f172a] p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition shadow-sm hover:shadow-md">
      <label className="text-gray-300 text-sm capitalize">
        {label.replace(/([A-Z])/g, " $1")}
      </label>

      <div className="flex">
        <div className="bg-gray-800 px-3 flex items-center rounded-l-xl border border-r-0 border-gray-700 text-sm">
          KES
        </div>

        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full bg-gray-900 border border-gray-700 rounded-r-xl p-3 text-right focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>
    </div>
  )
}

/* ================= SUMMARY CARD ================= */

const SummaryCard = ({ title, value, percentage, target, color }) => (
  <div
    className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 ${color}`}
  >
    <div className="flex justify-between font-semibold text-base md:text-lg">
      <span>{title}</span>
      <span>KES {value.toLocaleString()}</span>
    </div>

    {percentage !== undefined && (
      <div className="text-sm opacity-80 mt-2">
        {percentage}% of income (Target: {target}%)
      </div>
    )}
  </div>
)

/* ================= MAIN COMPONENT ================= */

export default function Budget() {
  /* ---------- INCOME ---------- */

  const [income, setIncome] = useState({
    salary: 50000,
    business: 0,
    side: 0,
    investment: 0,
    remittance: 0,
    other: 0,
  })

  /* ---------- ESSENTIALS ---------- */

  const [essentials, setEssentials] = useState({
    rent: 12000,
    electricity: 1000,
    water: 400,
    gas: 400,
    internet: 1500,
    garbage: 300,
    security: 300,
    matatu: 4000,
    fuel: 0,
    carInsurance: 0,
    carMaintenance: 0,
    boda: 800,
    uber: 0,
    parking: 0,
    supermarket: 5000,
    produce: 500,
    lunch: 0,
    airtime: 800,
    data: 500,
    nhif: 1375,
    privateInsurance: 0,
    doctor: 2000,
    meds: 1000,
  })

  /* ---------- WANTS ---------- */

  const [wants, setWants] = useState({
    salon: 2000,
    clothing: 0,
    gym: 0,
    netflix: 0,
    movies: 0,
    socialActivities: 1000,
    eatingOut: 3000,
    drinks: 1000,
    vacation: 0,
    familyVisits: 1500,
    gifts: 300,
    tithe: 500,
  })

  /* ---------- SAVINGS ---------- */

  const [savings, setSavings] = useState({
    emergency: 0,
    shortTerm: 0,
    nssf: 0,
    retirement: 0,
    unitTrusts: 0,
    chama: 0,
    homeDown: 0,
    carFund: 0,
    childrenFund: 0,
  })

  /* ---------- HELPERS ---------- */

  const sum = obj =>
    Object.values(obj).reduce((a, b) => a + Number(b || 0), 0)

  const totalIncome = sum(income)
  const totalEssentials = sum(essentials)
  const totalWants = sum(wants)
  const totalSavings = sum(savings)

  const totalExpenses = totalEssentials + totalWants + totalSavings
  const surplus = totalIncome - totalExpenses

  const percent = value =>
    totalIncome ? ((value / totalIncome) * 100).toFixed(1) : 0

  /* ---------- PDF EXPORT ---------- */

  const downloadPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Budget Summary Receipt", 105, 20, { align: "center" })

    doc.setFontSize(12)

    doc.text(`Income: KES ${totalIncome.toLocaleString()}`, 20, 40)
    doc.text(`Essentials: KES ${totalEssentials.toLocaleString()}`, 20, 50)
    doc.text(`Wants: KES ${totalWants.toLocaleString()}`, 20, 60)
    doc.text(`Savings: KES ${totalSavings.toLocaleString()}`, 20, 70)
    doc.text(`Surplus: KES ${surplus.toLocaleString()}`, 20, 80)

    doc.save("Budget_Summary_Receipt.pdf")
  }

  /* ---------- GRID RENDERER ---------- */

  const renderListGrid = (data, setter) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(data).map(([key, value]) => (
        <InputRow
          key={key}
          label={key}
          value={value}
          onChange={v =>
            setter(prev => ({
              ...prev,
              [key]: v,
            }))
          }
        />
      ))}
    </div>
  )

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#020617] text-white flex justify-center">
      <div className="w-full max-w-6xl p-4 md:p-10 space-y-8">

        {/* HERO */}

        <div className="relative overflow-hidden rounded-3xl border border-green-900/50 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-blue-900 opacity-40" />

          <div className="relative p-6 md:p-10 space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              Budget Calculator
            </h1>

            <p className="text-gray-300 text-sm md:text-base max-w-2xl">
              Track income, expenses and savings in a structured monthly financial snapshot.
            </p>
          </div>
        </div>

        {/* SECTIONS */}

        <div className="space-y-6">
          <Section title="Monthly Income Sources" icon="💰">
            {renderListGrid(income, setIncome)}
          </Section>

          <Section title="Essential Expenses (Needs)" icon="🏠">
            {renderListGrid(essentials, setEssentials)}
          </Section>

          <Section title="Flexible Expenses (Wants)" icon="🎯">
            {renderListGrid(wants, setWants)}
          </Section>

          <Section title="Financial Goals (Savings & Investments)" icon="💎">
            {renderListGrid(savings, setSavings)}
          </Section>
        </div>

        {/* SUMMARY */}

        <div className="space-y-5">
          <h2 className="text-xl md:text-2xl font-semibold">
            Financial Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <SummaryCard
              title="Total Monthly Income"
              value={totalIncome}
              color="bg-gradient-to-r from-green-800 to-green-700"
            />

            <SummaryCard
              title="Essential Expenses"
              value={totalEssentials}
              percentage={percent(totalEssentials)}
              target={60}
              color="bg-gradient-to-r from-red-900 to-red-800"
            />

            <SummaryCard
              title="Flexible Expenses"
              value={totalWants}
              percentage={percent(totalWants)}
              target={25}
              color="bg-gradient-to-r from-yellow-900 to-yellow-700"
            />

            <SummaryCard
              title="Savings & Investments"
              value={totalSavings}
              percentage={percent(totalSavings)}
              target={15}
              color="bg-gradient-to-r from-blue-900 to-blue-800"
            />

          </div>

          {/* TOTALS */}

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-gray-900 rounded-2xl p-6 flex justify-between text-lg font-semibold border border-gray-800">
              <span>Total Expenses</span>
              <span>KES {totalExpenses.toLocaleString()}</span>
            </div>

            <div
              className={`rounded-2xl p-6 font-bold text-lg border transition ${
                surplus >= 0
                  ? "bg-green-900/40 border-green-800 text-green-200"
                  : "bg-red-900/40 border-red-800 text-red-200"
              }`}
            >
              <div className="flex justify-between">
                <span>Surplus</span>
                <span>KES {surplus.toLocaleString()}</span>
              </div>

              <div className="text-sm font-normal mt-1 opacity-80">
                {surplus >= 0
                  ? "Great! You have money left over"
                  : "Warning: You are overspending"}
              </div>
            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={downloadPDF}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 transition py-4 rounded-xl font-semibold shadow-lg"
          >
            Share Budget Summary
          </button>
        </div>
      </div>
    </div>
  )
}