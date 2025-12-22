// src/components/products/CategoryFilter.jsx
import { useProductStore } from "../../store/productStore";
import { FiFilter } from "react-icons/fi";

const categories = [
  "Toutes les catégories",
  "Capsules",
  "Café Moulu",
  "Tasses",
  "Sirop",
];

export default function CategoryFilter() {
  const { filterByCategory } = useProductStore();

  return (
    <div className="mb-6 w-full max-w-full bg-[#ECEFF1] rounded-lg shadow-md border border-white p-4 flex items-center space-x-3">
      <FiFilter className="text-gray-600 w-6 h-6" />
      <label className="font-semibold text-gray-700">Catégorie:</label>

      <select
        className="flex-1 bg-[#E4B385] border border-gray-300 px-3 py-2 rounded-lg shadow-sm text-[#704232] "
        onChange={(e) => filterByCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
