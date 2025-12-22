import { create } from "zustand";
import api from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/login", { email, password });

      const token = res.data.token;     // <-- récupère ton API token
      const user = res.data.user;

      // mettre token dans axios pour les prochaines requêtes
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({
        user,
        token,
        loading: false,
      });

      localStorage.setItem("token", token);

      return true;

    } catch (err) {
      set({
        error: err.response?.data?.message || "Erreur de connexion",
        loading: false,
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      // même si le backend renvoie erreur → on déconnecte quand même
    }

    set({ user: null, token: null });
    localStorage.removeItem("token");

    delete api.defaults.headers.common["Authorization"];
  },
}));
