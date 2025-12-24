// src/components/users/UserForm.jsx
import React, { useState, useEffect } from "react";

export default function UserForm({ onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employe",
  });

  useEffect(() => {
    if (initialData) setForm({ ...initialData, password: "" });
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || (!initialData && !form.password)) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Modifier Utilisateur" : "Nouvel Utilisateur"}
        </h2>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            value={form.name}
            className="border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            className="border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {!initialData && (
            <input
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              className="border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          )}
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="employe">Employé</option>
          </select>

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
