import { useState, useEffect } from "react";
import { FiX, FiTruck } from "react-icons/fi";

export default function SupplierForm({ initialData, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[420px] rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-2 font-semibold">
            <FiTruck className="text-[#704232]" />
            {initialData ? "Modifier fournisseur" : "Ajouter fournisseur"}
          </div>
          <FiX
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-700"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-4 p-5"
        >
          <input className="input" placeholder="Nom du fournisseur"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input className="input" placeholder="Téléphone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input className="input" placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input className="input" placeholder="Adresse"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Annuler
            </button>
            <button className="btn-primary">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
