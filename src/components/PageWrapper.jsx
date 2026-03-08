export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  )
}