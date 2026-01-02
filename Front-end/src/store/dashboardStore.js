import { create } from "zustand";
import api from "../lib/axios";

export const useDashboardStore = create((set) => ({
  loading: false,          
  cards: {},                 
  charts: {},               
  stocksFaibles: [],         

  fetchDashboard: async () => {
    set({ loading: true });  
    try {
      const res = await api.get("/dashboard"); 
      set({
        cards: res.data.cards,
        charts: res.data.charts,
        stocksFaibles: res.data.stocksFaibles,
        loading: false,      
      });
    } catch (err) {
      console.error("Erreur fetchDashboard:", err);
      set({ loading: false }); 
    }
  },
}));
