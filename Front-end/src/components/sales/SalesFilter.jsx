import { FiFilter } from "react-icons/fi";
import { useSalesStore } from "../../store/salesStore";

export default function SalesFilter() {
  const { setFilter } = useSalesStore();

  return (
    <div className="mb-6 w-full max-w-full bg-[#ECEFF1] rounded-lg shadow-md border border-white p-4 flex items-center space-x-3">
      <label className="font-medium text-gray-700 flex items-center space-x-2 mb-2">
        <FiFilter className="text-gray-600" />
        <span>Période</span>
      </label>

      <select
        onChange={(e) => setFilter(e.target.value)}
        className="w-full bg-[#E4B385]  text-[#704232] px-4 py-2 rounded-lg border border-[#d9a47e50]  outline-none cursor-pointer"
      >
        <option value="all">Toutes les ventes</option>
        <option value="today">Aujourd’hui</option>
        <option value="week">Cette semaine</option>
        <option value="month">Ce mois</option>
      </select>
    </div>
  );
}
