import { FiFilter } from "react-icons/fi";

export default function SalesFilter({ filter, setFilter }) {
  return (
    <div className="mb-6 bg-[#ECEFF1] rounded-lg p-4 flex items-center space-x-3">
      <label className="flex items-center space-x-2 text-gray-700">
        <FiFilter />
        <span>Période</span>
      </label>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="flex-1 bg-[#E4B385] border border-gray-300 px-3 py-2 rounded-lg shadow-sm text-[#704232] "
      >
        <option value="all">Toutes les ventes</option>
        <option value="today">Aujourd’hui</option>
        <option value="week">Cette semaine</option>
        <option value="month">Ce mois</option>
      </select>
    </div>
  );
}
