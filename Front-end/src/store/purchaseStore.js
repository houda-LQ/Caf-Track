import { create } from "zustand";
import api from "../lib/axios";
import { useAuthStore } from "./authStore";

export const usePurchaseStore = create((set) => ({
  purchases: [],
  loading: false,

  fetchPurchases: async () => {
    const { user } = useAuthStore.getState(); // utilisateur connecté
    set({ loading: true });

    try {
      const res = await api.get("/purchases/list"); 
      // le backend filtrera selon le rôle
      set({ purchases: res.data, loading: false });
    } catch (err) {
      console.error("Erreur fetchPurchases:", err);
      set({ loading: false });
    }
  },

  createPurchase: async (data) => {
    try {
      const res = await api.post("/purchases", data);
      set((state) => ({
        purchases: [...state.purchases, res.data],
      }));
    } catch (err) {
      console.error("Erreur createPurchase:", err);
    }
  },
}));
