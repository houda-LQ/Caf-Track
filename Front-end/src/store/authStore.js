import { create } from "zustand";
import api from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  login: async (email, password) => {
  set({ loading: true, error: null });

  try {
    const res = await api.post("/login", { email, password });

    const token = res.data.token;
    const user = res.data.user;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    set({
      user,
      token,
      loading: false,
    });

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); 

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
  } catch {}

  set({ user: null, token: null });

  localStorage.removeItem("token");
  localStorage.removeItem("user"); 

  delete api.defaults.headers.common["Authorization"];
},

}));
