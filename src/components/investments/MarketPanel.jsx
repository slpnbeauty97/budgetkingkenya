// src/components/investments/MarketPanel.jsx
import { useEffect, useState } from "react"

export default function MarketPanel() {

  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Placeholder data, replace with real API if you have NSE endpoint
        const data = [
          { name: "Safaricom", ticker: "SCOM", price: 17.45 },
          { name: "Equity Bank", ticker: "EQTY", price: 41.25 },
          { name: "KCB Bank", ticker: "KCB", price: 33.10 },
          { name: "Co-op Bank", ticker: "COOP", price: 13.90 }
        ]
        setStocks(data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p>Loading market data...</p>

  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-xl mb-4">NSE Market Watch</h2>

      <div className="space-y-3">
        {stocks.map(stock => (
          <div key={stock.ticker} className="flex justify-between bg-gray-800 p-3 rounded-lg">
            <div>
              <p className="font-semibold">{stock.name}</p>
              <p className="text-sm text-gray-400">{stock.ticker}</p>
            </div>
            <p className="text-green-400 font-bold">KES {stock.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}