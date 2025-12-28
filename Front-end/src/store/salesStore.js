import { create } from "zustand";
import api from "../lib/axios";

export const useSalesStore = create((set) => ({
  sales: [],
  stats: { nombre_ventes: 0, chiffre_affaires: 0, benefice_net: 0 },
  error: null, // juste pour gérer les erreurs

  fetchSales: async (filter = "all") => {
    try {
      const res = await api.get(`/sales?period=${filter}`);
      set({ sales: res.data, error: null });
    } catch (err) {
      set({ error: err.response?.data?.message || "Erreur lors du chargement des ventes" });
    }
  },

  fetchStats: async (filter = "all") => {
    try {
      const res = await api.get(`/sales/stats?period=${filter}`);
      set({ stats: res.data, error: null });
    } catch (err) {
      set({ error: err.response?.data?.message || "Erreur lors du chargement des stats" });
    }
  },

  createSale: async (data) => {
    try {
      await api.post("/sales", data);
      set({ error: null });
    } catch (err) {
      set({ error: err.response?.data?.message || "Erreur lors de la création de la vente" });
    }
  },
}));
