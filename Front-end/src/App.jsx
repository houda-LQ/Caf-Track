import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <Routes>
      {/* Login page sans sidebar */}
      <Route path="/" element={<Login />} />

      {/* Dashboard page protégée avec sidebar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Produits avec sidebar */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Products />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Ajouter ici les autres pages protégées */}
      {/* /sales, /suppliers, /users, /settings */}
    </Routes>
  );
}
