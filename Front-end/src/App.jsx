import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Users from "./pages/Users";   //  ⬅️  IMPORT IMPORTANT !
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <Routes>

      {/* Page login */}
      <Route path="/" element={<Login />} />

      {/* Routes protégées */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />  
        <Route path="/users" element={<Users />} />   {/*  ⬅️  ROUTE UTILISATEURS */}
      </Route>

      {/* Page accès refusé */}
      <Route path="/unauthorized" element={<h1>Accès refusé</h1>} />
    </Routes>
  );
}
