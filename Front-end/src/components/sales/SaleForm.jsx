// src/components/sales/SaleForm.jsx
import { useState, useEffect } from "react";
import { useSalesStore } from "../../store/salesStore";
import { useProductStore } from "../../store/productStore"; // pour récupérer la liste des produits

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
    fetchProducts(); // récupère la liste des produits au chargement
  }, []);

  // Quand on change le produit, mettre à jour le prix unitaire
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
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Nouvelle Vente</h2>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Select produit */}
          <select
            value={form.product_id}
            onChange={handleProductChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Sélectionnez un produit</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Stock: {p.quantity})
              </option>
            ))}
          </select>

          {/* Prix unitaire (lecture seule) */}
          <input
            type="number"
            placeholder="Prix unitaire"
            value={form.unit_price}
            readOnly
            className="border px-3 py-2 rounded bg-gray-100"
          />

          {/* Quantité */}
          <input
            type="number"
            placeholder="Quantité"
            value={form.quantity}
            className="border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          {/* Nom client */}
          <input
            type="text"
            placeholder="Client"
            value={form.client_name}
            className="border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, client_name: e.target.value })}
          />

          {/* Boutons */}
          <div className="flex justify-end space-x-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
              Annuler
            </button>
            <button type="submit" className="bg-[#704232] text-white px-4 py-2 rounded">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
