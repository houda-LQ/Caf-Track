// src/pages/Users.jsx
import React, { useEffect, useState } from "react";
import { useUsersStore } from "../store/useUsersStore";
import UsersCards from "../components/users/UsersCards";
import UsersTable from "../components/users/UsersTable";
import UserForm from "../components/users/UserForm";

export default function Users() {
  const { users, totals, fetchUsers, createUser, updateUser, deleteUser } =
    useUsersStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      deleteUser(id);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, data);
      } else {
        await createUser(data);
      }
      setIsFormOpen(false);
      setEditingUser(null);
    } catch (error) {
      alert("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#37474F]">
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-500">Créer, modifier et suivre les utilisateurs</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center bg-[#704232] hover:bg-amber-800 text-white px-4 py-2 rounded shadow-md"
        >
          Ajouter un utilisateur
        </button>
      </div>

      <UsersCards totals={totals} />
      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      {isFormOpen && (
        <UserForm
          initialData={editingUser}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
