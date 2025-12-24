import { create } from "zustand";
import api from "../lib/axios";

export const useSalesStore = create((set) => ({
  sales: [],
  stats: { nombre_ventes: 0, chiffre_affaires: 0, benefice_net: 0 },

  fetchSales: async (filter = "all") => {
    const res = await api.get(`/sales?period=${filter}`);
    set({ sales: res.data });
  },

  fetchStats: async (filter = "all") => {
    const res = await api.get(`/sales/stats?period=${filter}`);
    set({ stats: res.data });
  },

  createSale: async (data) => {
    await api.post("/sales", data);
  },
}));
