import { useState, useEffect } from "react";
import { FiPlus, FiUsers } from "react-icons/fi";
import { useSupplierStore } from "../store/supplierStore";
import { useAuthStore } from "../store/authStore";
import SuppliersTable from "../components/suppliers/SuppliersTable";
import SupplierForm from "../components/suppliers/SupplierForm";

export default function SuppliersPage() {
  const { fetchSuppliers } = useSupplierStore();
  const { user } = useAuthStore();
  const [openForm, setOpenForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <div>
            <h1 className="text-3xl font-bold text-[#37474F]">Fournisseurs</h1>
            <p className="text-sm text-gray-500">
              Gestion des partenaires et fournisseurs
            </p>
          </div>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() => {
              setEditingSupplier(null);
              setOpenForm(true);
            }}
            className="
              flex items-center gap-2
              rounded-xl
              bg-gradient-to-r from-[#704232] to-[#8b5543]
              px-5 py-2.5
              text-sm font-medium text-white
              shadow-md hover:shadow-lg
              transition-all
            "
          >
            <FiPlus />
            Nouveau fournisseur
          </button>
        )}
      </div>

      <SuppliersTable
        onEdit={(s) => {
          setEditingSupplier(s);
          setOpenForm(true);
        }}
      />

      {openForm && (
        <SupplierForm
          initialData={editingSupplier}
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
}
