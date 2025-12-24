// src/stores/useUsersStore.js
import { create } from "zustand";
import axios from "../lib/axios";

export const useUsersStore = create((set) => ({
  users: [],
  totals: { total_users: 0, admins: 0, employees: 0 },
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/users/list"); 
      set({
        users: res.data.users,
        totals: res.data.totals,
        loading: false,
      });
    } catch (err) {
      set({ error: err.response?.data, loading: false });
    }
  },

  createUser: async (data) => {
    try {
      const res = await axios.post("/users", data);
      set((state) => ({
        users: [...state.users, res.data.user],
        totals: {
          ...state.totals,
          total_users: state.totals.total_users + 1,
          employees:
            data.role === "employe"
              ? state.totals.employees + 1
              : state.totals.employees,
          admins:
            data.role === "admin"
              ? state.totals.admins + 1
              : state.totals.admins,
        },
      }));
    } catch (err) {
      console.log("Erreur createUser:", err.response?.data);
      throw err;
    }
  },

  updateUser: async (id, data) => {
    try {
      const res = await axios.put(`/users/${id}`, data);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? res.data.user : u)),
      }));
    } catch (err) {
      console.log("Erreur updateUser:", err.response?.data);
      throw err;
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`/users/delete/${id}`);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        totals: {
          ...state.totals,
          total_users: state.totals.total_users - 1,
          // tu peux recalculer admins/employés si nécessaire
        },
      }));
    } catch (err) {
      console.log("Erreur deleteUser:", err.response?.data);
      throw err;
    }
  },
}));
