import { create } from "zustand";
import api from "../lib/axios"; // ✅ utilise le default export

export const useProductStore = create((set, get) => ({
  products: [],
  userRole: "admin", 

  setUserRole: (role) => set({ userRole: role }),

  fetchProducts: async () => {
    const res = await api.get("/products");
    set({ products: res.data });
  },

  filterByCategory: async (category) => {
    if (category === "Toutes les catégories") {
      return get().fetchProducts();
    }
    const res = await api.get(`/products/category/${category}`);
    set({ products: res.data });
  },

 createProduct: async (data) => {
  const res = await api.post("/products", data);
  set({ products: [...get().products, res.data.product] });
},


  updateProduct: async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  set({
    products: get().products.map((p) =>
      p.id === id ? res.data.product || res.data : p
    ),
  });
},


  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`);
    set({
      products: get().products.filter((p) => p.id !== id),
    });
  },
}));
