export default function CalculatorLayout({ title, children }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        {title}
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
        {children}
      </div>
    </div>
  )
}