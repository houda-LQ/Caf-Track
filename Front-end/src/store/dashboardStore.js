// src/store/dashboardStore.js
import { create } from "zustand";
import api from "../lib/axios";

export const useDashboardStore = create((set) => ({
  loading: false,
  error: null,
  data: null,

  charts: {
    top5Products: [],
    last7Days: [],
    categorySales: [],
  },

  fetchDashboard: async () => {
    set({ loading: true, error: null });

    try {
      const [dashboardRes, statsRes] = await Promise.all([
        api.get("/dashboard"),
        api.get("/sales/stats"),
      ]);

      set({
        data: dashboardRes.data,
        charts: {
          top5Products: statsRes.data.top5Products,
          last7Days: statsRes.data.last7Days,
          categorySales: statsRes.data.categorySales,
        },
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Erreur dashboard",
        loading: false,
      });
    }
  },
}));
