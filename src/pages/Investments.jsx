import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ================= Market Panel ================= */
const MarketPanel = ({ treasuryYield, inflationRate, interestRate }) => (
  <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
    <h2 className="text-xl mb-4">Market Overview</h2>
    <p className="text-gray-300">📈 Treasury Yield (CBK 91d): {treasuryYield}%</p>
    <p className="text-gray-300">📉 Inflation Rate: {inflationRate}%</p>
    <p className="text-gray-300">💰 Avg Bank Interest Rate: {interestRate}%</p>
  </div>
);

/* ================= Main Dashboard ================= */
export default function InvestmentsDashboard() {
  /* ---------- Calculator Inputs ---------- */
  const [calculator, setCalculator] = useState({
    initialCapital: 50000,
    monthlyContribution: 5000,
    years: 20,
    expectedReturn: 8,
    inflationRate: 5,
  });

  /* ---------- Asset Inputs ---------- */
  const [assets, setAssets] = useState({
    cash: 20000,
    stocksSafaricom: 20000,
    stocksBlueChip: 20000,
    bonds: 15000,
    tBills: 10000,
    mmf: 5000,
    realEstate: 300000,
  });

  const [liabilities, setLiabilities] = useState({
    loan: 100000,
    creditCard: 5000,
  });

  /* ---------- Market Data (Static for now) ---------- */
  const marketData = {
    treasuryYield: 8.2,
    inflationRate: 5.1,
    interestRate: 9,
  };

  /* ---------- Handlers ---------- */
  const handleCalculatorChange = (field, value) =>
    setCalculator((prev) => ({ ...prev, [field]: Number(value) }));

  const handleAssetChange = (field, value) =>
    setAssets((prev) => ({ ...prev, [field]: Number(value) }));

  /* ---------- Net Worth ---------- */
  const netWorth = useMemo(
    () =>
      Object.values(assets).reduce((a, b) => a + b, 0) -
      Object.values(liabilities).reduce((a, b) => a + b, 0),
    [assets, liabilities]
  );

  /* ---------- Future Value (Inflation-Adjusted) ---------- */
  const futureValue = useMemo(() => {
    const { initialCapital: P, monthlyContribution: C, expectedReturn: rPct, inflationRate: iPct, years: n } = calculator;
    const r = rPct / 100;
    let FV = P * Math.pow(1 + r, n);
    for (let k = 1; k <= n; k++) FV += C * Math.pow(1 + r, n - k);
    return Math.round(FV / Math.pow(1 + iPct / 100, n));
  }, [calculator]);

  /* ---------- Growth Projection ---------- */
  const growthData = useMemo(() => {
    const { initialCapital: P, monthlyContribution: C, expectedReturn: rPct, years: n } = calculator;
    const r = rPct / 100;
    const data = [];
    let wealth = P;
    for (let year = 0; year <= n; year++) {
      data.push({ year, value: Math.round(wealth) });
      wealth = wealth * (1 + r) + C * 12;
    }
    return data;
  }, [calculator]);

  /* ---------- FIRE Target ---------- */
  const annualSpending = 120000; // example
  const safeWithdrawal = 4;
  const fireTarget = Math.round((annualSpending * 100) / safeWithdrawal);
  const yearsToFIRE = Math.ceil(
    calculator.monthlyContribution
      ? Math.log((fireTarget * (safeWithdrawal / 100)) / (calculator.monthlyContribution * 12 + calculator.initialCapital * (calculator.expectedReturn / 100))) /
          Math.log(1 + calculator.expectedReturn / 100)
      : 0
  );

  /* ---------- Portfolio Pie Chart ---------- */
  const pieData = useMemo(() => Object.entries(assets).map(([name, value]) => ({ name, value })), [assets]);
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#f43f5e", "#22d3ee"];

  /* ---------- Robo Advisor ---------- */
  const roboAdvice = useMemo(() => {
    const totalInvestments = assets.stocksSafaricom + assets.stocksBlueChip + assets.bonds + assets.tBills + assets.mmf;
    const stocksPct = (((assets.stocksSafaricom + assets.stocksBlueChip) / totalInvestments) * 100).toFixed(1);
    const bondsPct = (((assets.bonds + assets.tBills + assets.mmf) / totalInvestments) * 100).toFixed(1);
    return `Current allocation: Stocks ${stocksPct}%, Bonds/MMF ${bondsPct}%. Recommended: Stocks 60%, Bonds/MMF 40%.`;
  }, [assets]);

  /* ---------- PDF Export ---------- */
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Interactive Wealth Dashboard", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Net Worth: KES ${netWorth.toLocaleString()}`, 20, 40);
    doc.text(`FIRE Target: KES ${fireTarget.toLocaleString()} | Years to FIRE: ${yearsToFIRE}`, 20, 50);
    doc.text(`Projected Future Value: KES ${futureValue.toLocaleString()}`, 20, 60);
    doc.text(`Robo Advisor: ${roboAdvice}`, 20, 70);
    doc.save("Wealth_Dashboard_Report.pdf");
  };

  /* ---------- M-Pesa Invest ---------- */
  const investViaMpesa = () => alert(`🚀 Trigger M-Pesa STK Push for investment: Use KES ${assets.cash} cash!`);

  /* ================== UI ================== */
  return (
    <div className="max-w-7xl mx-auto p-10 space-y-8 text-white">
      <h1 className="text-3xl font-bold">Interactive Wealth Dashboard</h1>

      {/* Calculator Inputs */}
      <div className="grid md:grid-cols-2 gap-6 bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h2 className="text-xl mb-4 col-span-2">Investment Calculator</h2>
        {Object.entries(calculator).map(([key, value]) => (
          <div key={key} className="flex flex-col mb-2">
            <label className="text-gray-300 capitalize mb-1">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleCalculatorChange(key, e.target.value)}
              className="p-2 rounded-xl bg-gray-800 border border-gray-700 text-white"
            />
          </div>
        ))}
      </div>

      {/* Asset Inputs */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h2 className="text-xl mb-4 col-span-3">Portfolio Inputs</h2>
        {Object.entries(assets).map(([key, value]) => (
          <div key={key} className="flex flex-col mb-2">
            <label className="text-gray-300 capitalize mb-1">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleAssetChange(key, e.target.value)}
              className="p-2 rounded-xl bg-gray-800 border border-gray-700 text-white"
            />
          </div>
        ))}
      </div>

      {/* Net Worth & FIRE */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-xl mb-4">Net Worth</h2>
          <p className="text-lg font-semibold">KES {netWorth.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-xl mb-4">FIRE Target</h2>
          <p className="text-lg font-semibold">
            KES {fireTarget.toLocaleString()} | Years to FIRE: {yearsToFIRE}
          </p>
        </div>
      </div>

      {/* Portfolio Pie Chart */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h2 className="text-xl mb-4">Portfolio Allocation</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={110} label>
              {pieData.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Chart */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h2 className="text-xl mb-4">Wealth Growth Projection</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Market Panel */}
      <MarketPanel {...marketData} />

      {/* Robo Advisor & M-Pesa */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h2 className="text-xl mb-4">Robo Advisor & Rebalancing</h2>
        <p>{roboAdvice}</p>
        <button
          onClick={investViaMpesa}
          className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold shadow-lg"
        >
          Invest Now via M-Pesa
        </button>
      </div>

      {/* PDF Export */}
      <button
        onClick={exportPDF}
        className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg"
      >
        Export Dashboard PDF
      </button>
    </div>
  );
}