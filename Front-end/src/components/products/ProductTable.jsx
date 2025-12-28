import { useState } from "react";
import { useProductStore } from "../../store/productStore";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";

export default function ProductTable({ onEdit }) {
  const { products,deleteProduct } = useProductStore();
  const { user } = useAuthStore();  
  const userRole = user?.role;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusBadge = (p) =>
    p.quantity <= p.alert ? (
      <span className="text-red-600 rounded-full text-xs font-medium">
        Stock faible
      </span>
    ) : (
      <span className="text-green-700 rounded-full text-xs font-medium">
        En stock
      </span>
    );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Liste des Produits
      </h2>

      <div className="max-h-[500px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 text-gray-800 table-auto">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase font-medium">
            <tr>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Catégorie</th>
              <th className="px-6 py-3 text-left">Quantité</th>
              <th className="px-6 py-3 text-left">Prix Achat</th>
              <th className="px-6 py-3 text-left">Prix Vente</th>
              <th className="px-6 py-3 text-left">Marge</th>
              <th className="px-6 py-3 text-left">Statut</th>
              {userRole === "admin" && <th className="px-6 py-3 text-left">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {paginatedProducts.map((p) => (
              <tr
                key={p.id || `temp-${p.name}-${Math.random()}`}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">{p.quantity}</td>
                <td className="px-6 py-4">{p.purchase_price} DH</td>
                <td className="px-6 py-4">{p.sale_price} DH</td>
                <td className="px-6 py-4 text-amber-700 font-semibold">
                  {p.sale_price - p.purchase_price} DH
                </td>
                <td className="px-6 py-4">{statusBadge(p)}</td>
                
                {userRole === "admin" && (
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <button
                      className="text-gray-600 hover:text-blue-800 transition"
                      onClick={() => onEdit(p)}
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => deleteProduct(p.id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                )}
              </tr>
            ))}

            {paginatedProducts.length === 0 && (
              <tr key="no-products">
                <td
                  colSpan={userRole === "admin" ? 8 : 7}
                  className="px-6 py-6 text-center text-gray-500 italic"
                >
                  Aucun produit disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Précédent
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-amber-700 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
