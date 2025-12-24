// src/components/users/UsersCards.jsx
import React from "react";

export default function UsersCards({ totals }) {
  if (!totals) return null; // ✅ sécurité

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-[#ECEFF1] border border-white p-6 rounded-xl shadow-md">
        <p>Total utilisateurs</p>
        <h2 className="text-3xl font-light">{totals.total_users}</h2>
      </div>
      <div className="bg-[#ECEFF1] border border-white p-6 rounded-xl shadow-md">
        <p>Admins</p>
        <h2 className="text-3xl font-light">{totals.admins}</h2>
      </div>
      <div className="bg-[#ECEFF1] border border-white p-6 rounded-xl shadow-md">
        <p>Employés</p>
        <h2 className="text-3xl font-light">{totals.employees}</h2>
      </div>
    </div>
  );
}
