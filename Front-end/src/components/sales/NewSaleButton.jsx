// src/components/sales/NewSaleButton.jsx
import { FiPlus } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";

export default function NewSaleButton({ onClick }) {
  const { user } = useAuthStore();

  if (user?.role !== "employe") return null;

  return (
    <button
      onClick={onClick}
      className="flex items-center bg-[#704232] hover:bg-amber-800 text-white px-4 py-2 rounded shadow-md"
    >
      <FiPlus className="mr-2" /> Nouvelle Vente
    </button>
  );
}
