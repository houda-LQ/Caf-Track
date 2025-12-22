import { useSalesStore } from "../../store/salesStore";

export default function SalesTable() {
  const { sales } = useSalesStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Historique des Ventes
      </h2>

      <table className="min-w-full divide-y divide-gray-200 text-gray-800">
        <thead className="bg-gray-100 text-sm uppercase text-gray-600 font-medium">
          <tr>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Produit</th>
            <th className="px-6 py-3 text-left">Quantité</th>
            <th className="px-6 py-3 text-left">Prix Unitaire</th>
            <th className="px-6 py-3 text-left">Total</th>
            <th className="px-6 py-3 text-left">Marge</th>
            <th className="px-6 py-3 text-left">Client</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-sm">
          {sales.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-3">{s.sale_date}</td>
              <td className="px-6 py-3">{s.product.name}</td>
              <td className="px-6 py-3">{s.quantity}</td>
              <td className="px-6 py-3">{s.unit_price} MAD</td>
              <td className="px-6 py-3">{s.total} MAD</td>
              <td className="px-6 py-3 text-green-700">{s.margin} MAD</td>
              <td className="px-6 py-3">{s.client_name}</td>
            </tr>
          ))}

          {sales.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="text-center py-6 text-gray-500 italic"
              >
                Aucune vente trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
