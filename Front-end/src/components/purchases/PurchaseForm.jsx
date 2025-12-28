import { useState, useEffect } from "react";
import { usePurchaseStore } from "../../store/purchaseStore";
import api from "../../lib/axios";
import { FiX, FiShoppingCart } from "react-icons/fi";

export default function PurchaseForm({ onClose }) {
  const { createPurchase } = usePurchaseStore();
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    product_id: "",
    supplier_id: "",
    quantity: "",
    purchase_date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    const fetchData = async () => {
      const prodRes = await api.get("/products");
      const suppRes = await api.get("/suppliers");
      setProducts(prodRes.data || []);
      setSuppliers(suppRes.data || []);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPurchase({ ...form, quantity: Number(form.quantity) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[420px] shadow-xl">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FiShoppingCart /> Nouvel Achat
          </h2>
          <button onClick={onClose}>
            <FiX className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          <select
            className="input"
            value={form.product_id}
            onChange={(e) => setForm({ ...form, product_id: e.target.value })}
            required
          >
            <option value="">Produit</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.category}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={form.supplier_id}
            onChange={(e) => setForm({ ...form, supplier_id: e.target.value })}
            required
          >
            <option value="">Fournisseur</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantité"
            className="input"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
          />

          <input
            type="date"
            className="input"
            value={form.purchase_date}
            onChange={(e) => setForm({ ...form, purchase_date: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Annuler
            </button>
            <button className="btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
