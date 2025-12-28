import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import ProductTable from "../components/products/ProductTable";
import ProductForm from "../components/products/ProductForm";
import CategoryFilter from "../components/products/CategoryFilter";
import { FiPlus } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";


export default function Products() {
  const { fetchProducts, createProduct, updateProduct } = useProductStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useAuthStore();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddForm = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, data);
    } else {
      await createProduct(data);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#37474F]">CaféTrack – Gestion des Produits</h1>
        {/* <p className="text-gray-500 mt-1">Gérez votre inventaire et surveillez vos stocks</p> */}


       {user?.role === "admin" && (
  <button
    className="flex items-center bg-[#704232] hover:bg-amber-800 text-white px-4 py-2 rounded"
    onClick={openAddForm}
  >
    <FiPlus className="mr-2" />
    Ajouter un Produit
  </button>
)}

      </div>

      <CategoryFilter />

      <ProductTable onEdit={openEditForm} />

      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
