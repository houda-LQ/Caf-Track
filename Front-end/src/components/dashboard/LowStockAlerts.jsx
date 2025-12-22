export default function LowStockAlerts({ products = [] }) {
  if (!products.length) return <p className="p-6">Aucune alerte de stock</p>;

  return (
    <div className="bg-cream p-6 rounded-xl shadow-md hover:shadow-lg transition mt-6">
      <h2 className="text-gray-700 font-semibold mb-4">Alertes de Stock Faible</h2>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="flex justify-between items-center">
            <span>{p.name}</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              {p.stock} / Min: {p.min_stock}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
