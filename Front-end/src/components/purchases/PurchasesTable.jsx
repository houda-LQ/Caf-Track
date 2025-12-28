import { usePurchaseStore } from "../../store/purchaseStore";

export default function PurchasesTable() {
  const { purchases } = usePurchaseStore();

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="th">Date</th>
            <th className="th">Produit</th>
            <th className="th">Fournisseur</th>
            <th className="th text-right">Quantité</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(p => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="td">{p.purchase_date}</td>
              <td className="td font-medium">{p.product?.name}</td>
              <td className="td">{p.supplier?.name}</td>
              <td className="td text-right font-semibold">{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
