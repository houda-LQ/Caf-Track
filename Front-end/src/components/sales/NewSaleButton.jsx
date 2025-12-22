import { FiPlus } from "react-icons/fi";
import { useProductStore } from "../../store/productStore";

export default function NewSaleButton({ onClick }) {
  const { userRole } = useProductStore();

  if (userRole !== "employe") return null;

  return (
    <button
      onClick={onClick}
      className="flex items-center bg-[#704232] hover:bg-amber-800 text-white px-4 py-2 rounded shadow-md"
    >
      <FiPlus className="mr-2" /> Nouvelle Vente
    </button>
  );
}
