import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // { id, name, role }

  if (!token) {
    return <Navigate to="/" />;
  }

  // Si une route demande un rôle spécifique
  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
