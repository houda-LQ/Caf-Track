import { create } from "zustand";
import api from "../lib/axios";

export const useSupplierStore = create((set) => ({
  suppliers: [],
  loading: false, 
  error: null,    

  // Récupérer tous les fournisseurs
  fetchSuppliers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/suppliers");
      set({ suppliers: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false, error: err.response?.data || err.message });
    }
  },

  // Créer un fournisseur
  createSupplier: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/suppliers", data);
      set((state) => ({
        suppliers: [...state.suppliers, res.data],
        loading: false
      }));
    } catch (err) {
      console.error(err);
      set({ loading: false, error: err.response?.data || err.message });
    }
  },

  // Mettre à jour un fournisseur
  updateSupplier: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/suppliers/${id}`, data);
      set((state) => ({
        suppliers: state.suppliers.map((s) =>
          s.id === id ? res.data : s
        ),
        loading: false
      }));
    } catch (err) {
      console.error(err);
      set({ loading: false, error: err.response?.data || err.message });
    }
  },

  // Supprimer un fournisseur
  deleteSupplier: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/suppliers/delete/${id}`);
      set((state) => ({
        suppliers: state.suppliers.filter((s) => s.id !== id),
        loading: false
      }));
    } catch (err) {
      console.error(err);
      set({ loading: false, error: err.response?.data || err.message });
    }
  },
}));
