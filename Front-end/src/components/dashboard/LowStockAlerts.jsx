export default function LowStockAlerts({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Alertes Stock Faible</h3>

      {data.length === 0 ? (
        <p className="text-gray-500">Aucun produit en faible stock</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((p) => (
            <div
              key={p.name}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition-all"
            >
              <div>
                <p className="font-medium text-gray-700">{p.name}</p>
                <p className="text-sm text-gray-500">{p.category}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[#d4173d] font-semibold">{p.quantity} unités</span>
                <span className="text-xs text-gray-400">Min: {p.alert}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
