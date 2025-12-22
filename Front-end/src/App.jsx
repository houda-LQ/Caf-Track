import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales"; 
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <Routes>
      
      {/* Page login */}
      <Route path="/" element={<Login />} />

      {/* Routes protégées avec layout */}
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
      </Route>

      {/* Page si l'utilisateur n'a pas le rôle */}
      <Route path="/unauthorized" element={<h1>Accès refusé</h1>} />
    </Routes>
  );
}
