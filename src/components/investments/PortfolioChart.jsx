// src/components/investments/PortfolioChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

export default function PortfolioChart() {

  const data = [
    { name: "Stocks", value: 40000 },
    { name: "Money Market", value: 30000 },
    { name: "Treasury Bills", value: 20000 },
    { name: "Crypto", value: 10000 }
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-xl mb-4">Portfolio Allocation</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={110} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}