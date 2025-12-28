import { useState, useEffect } from "react";
import { usePurchaseStore } from "../store/purchaseStore";
import { useAuthStore } from "../store/authStore";
import PurchasesTable from "../components/purchases/PurchasesTable";
import PurchaseForm from "../components/purchases/PurchaseForm";
import { FiPlus } from "react-icons/fi";

export default function PurchasesPage() {
  const { fetchPurchases } = usePurchaseStore();
  const { user } = useAuthStore();
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
         <div>
            <h1 className="text-3xl font-bold text-[#37474F]">Achats</h1>
            <p className="text-sm text-gray-500">
               Gestion des achats et du stock
            </p>
          </div>
        

      {user?.role === "admin" && (
  <button
    onClick={() => setOpenForm(true)}
    className="
      flex items-center gap-2
      bg-[#704232] hover:bg-[#5b3529]
      text-white font-medium
      px-5 py-2.5
      rounded-xl
      shadow-md hover:shadow-lg
      transition-all
    "
  >
    <FiPlus className="text-lg" />
    Nouvel achat
  </button>
)}


      </div>

      <PurchasesTable />

      {openForm && <PurchaseForm onClose={() => setOpenForm(false)} />}
    </div>
  );
}
