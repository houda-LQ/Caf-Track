// src/components/users/UsersTable.jsx
import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function UsersTable({ users, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Liste des utilisateurs</h2>

      <table className="min-w-full divide-y divide-gray-200 text-gray-800">
        <thead className="bg-gray-100 text-sm uppercase text-gray-600 font-medium">
          <tr>
            <th className="px-6 py-3 text-left">Nom</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-sm">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">{user.role}</td>

              <td className="px-6 py-3">
                <div className="flex items-center justify-center space-x-4">

                  {/* Icône Modifier */}
                  <FiEdit
                    size={20}
                    className="text-blue-600 cursor-pointer hover:scale-110 transition"
                    onClick={() => onEdit(user)}
                  />

                  {/* Icône Supprimer */}
                  <FiTrash
                    size={20}
                    className="text-red-600 cursor-pointer hover:scale-110 transition"
                    onClick={() => {
                      if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
                        onDelete(user.id);
                      }
                    }}
                  />

                </div>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500 italic">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
