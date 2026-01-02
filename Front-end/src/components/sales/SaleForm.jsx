// src/components/sales/SaleForm.jsx
import { useState, useEffect } from "react";
import { useSalesStore } from "../../store/salesStore";
import { useProductStore } from "../../store/productStore";

export default function SaleForm({ onClose }) {
  const { createSale } = useSalesStore();
  const { products, fetchProducts } = useProductStore();

  const [form, setForm] = useState({
    product_id: "",
    client_name: "",
    quantity: 1,
    unit_price: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const selectedId = e.target.value;
    const selectedProduct = products.find((p) => p.id === Number(selectedId));
    setForm({
      ...form,
      product_id: selectedId,
      unit_price: selectedProduct ? selectedProduct.sale_price : 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.product_id || !form.client_name || form.quantity <= 0) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }

    try {
      const payload = {
        product_id: Number(form.product_id),
        client_name: form.client_name,
        quantity: Number(form.quantity),
      };
      await createSale(payload);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création de la vente :", error.response?.data || error);
      alert("Erreur lors de la création de la vente. Vérifiez les champs et réessayez.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Nouvelle Vente</h2>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Produit */}
          <div className="flex flex-col">
            <label htmlFor="product" className="mb-1 font-medium text-gray-700">Produit</label>
            <select
              id="product"
              value={form.product_id}
              onChange={handleProductChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            >
              <option value="">Sélectionnez un produit</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Stock: {p.quantity})
                </option>
              ))}
            </select>
          </div>

          {/* Prix unitaire */}
          <div className="flex flex-col">
            <label htmlFor="unit_price" className="mb-1 font-medium text-gray-700">Prix Unitaire</label>
            <input
              type="number"
              id="unit_price"
              placeholder="Prix unitaire"
              value={form.unit_price}
              readOnly
              className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-700"
            />
          </div>

          {/* Quantité */}
          <div className="flex flex-col">
            <label htmlFor="quantity" className="mb-1 font-medium text-gray-700">Quantité</label>
            <input
              type="number"
              id="quantity"
              placeholder="Quantité"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            />
          </div>

          {/* Client */}
          <div className="flex flex-col">
            <label htmlFor="client_name" className="mb-1 font-medium text-gray-700">Client</label>
            <input
              type="text"
              id="client_name"
              placeholder="Nom du client"
              value={form.client_name}
              onChange={(e) => setForm({ ...form, client_name: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-[#704232] text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition shadow-md"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
