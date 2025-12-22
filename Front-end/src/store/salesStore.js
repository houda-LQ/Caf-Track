import { create } from "zustand";
import api from "../lib/axios";

export const useSalesStore = create((set, get) => ({
  sales: [],
  stats: { nombre_ventes: 0, chiffre_affaires: 0, benefice_net: 0 },

  fetchSales: async () => {
    const res = await api.get("/sales");
    set({ sales: res.data });
  },

  fetchStats: async () => {
    const res = await api.get("/sales/stats");
    set({ stats: res.data });
  },

  createSale: async (data) => {
    try {
      const res = await api.post("/sales", data);
      console.log("Vente créée", res.data);

      await Promise.all([
        get().fetchSales(),
        get().fetchStats()
      ]);

      return true;

    } catch (error) {
      console.error("Erreur createSale:", error.response?.data || error);
      throw error;
    }
  },
}));
