// src/components/products/ProductForm.jsx
import { useState, useEffect } from "react";

export default function ProductForm({ product, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    purchase_price: "",
    sale_price: "",
    alert: "",
  });

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {product ? "Modifier le Produit" : "Ajouter un Produit"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Catégorie</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Quantité</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Alerte stock</label>
            <input
              type="number"
              name="alert"
              value={formData.alert}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Prix d'achat</label>
            <input
              type="number"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Prix de vente</label>
            <input
              type="number"
              name="sale_price"
              value={formData.sale_price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Footer buttons */}
          <div className="col-span-2 flex justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded"
            >
              {product ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
