import { create } from "zustand";
import axios from "../lib/axios";

export const useUsersStore = create((set) => ({
  users: [],
  totals: { total_users: 0, admins: 0, employees: 0 },
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/users/list"); 
      set({
        users: res.data.users,
        totals: res.data.totals,
        loading: false,
      });
    } catch (err) {
      set({ loading: false, error: err.response?.data || err.message });
    }
  },

  createUser: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/users", data);
      set((state) => ({
        users: [...state.users, res.data.user],
        totals: {
          ...state.totals,
          total_users: state.totals.total_users + 1,
          employees: data.role === "employe" ? state.totals.employees + 1 : state.totals.employees,
          admins: data.role === "admin" ? state.totals.admins + 1 : state.totals.admins,
        },
        loading: false,
      }));
    } catch (err) {
      set({ loading: false, error: err.response?.data || err.message });
      console.log("Erreur createUser:", err.response?.data);
      throw err;
    }
  },

  updateUser: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/users/${id}`, data);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? res.data.user : u)),
        loading: false,
      }));
    } catch (err) {
      set({ loading: false, error: err.response?.data || err.message });
      console.log("Erreur updateUser:", err.response?.data);
      throw err;
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/users/delete/${id}`);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        totals: {
          ...state.totals,
          total_users: state.totals.total_users - 1,
        },
        loading: false,
      }));
    } catch (err) {
      set({ loading: false, error: err.response?.data || err.message });
      console.log("Erreur deleteUser:", err.response?.data);
      throw err;
    }
  },
}));
