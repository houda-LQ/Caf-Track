// src/layout/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiTruck,
} from "react-icons/fi";
import logo from "../assets/logo.png";

const navItems = [
  { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
  { name: "Produits", icon: <FiBox />, path: "/products" },
  { name: "Ventes", icon: <FiShoppingCart />, path: "/sales" },
  { name: "Fournisseurs & Achats", icon: <FiTruck />, path: "/suppliers" },
  { name: "Gestion des Utilisateurs", icon: <FiUsers />, path: "/users" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  const goToSettings = () => {
    navigate("/settings"); 
  };

  return (
    <aside className="w-20 bg-[#37474F] flex flex-col items-center py-6">

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="bg-white p-2 rounded-full shadow-md">
          <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
        </div>
      </div>

      {/* Navigation principale */}
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-16 mb-4 text-white 
             hover:bg-[#455A64] relative group
             ${isActive ? "border-r-4 border-coral-500" : ""}`
          }
          title={item.name}
        >
          {item.icon}
        </NavLink>
      ))}

      {/* Paramètres & Déconnexion */}
      <div className="mt-auto flex flex-col items-center w-full space-y-4">
        <button
          onClick={goToSettings}
          className="flex flex-col items-center justify-center w-full h-16 text-white hover:bg-[#455A64]"
          title="Paramètres"
        >
          <FiSettings  />
        </button>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center w-full h-16 text-white hover:bg-[#455A64]"
          title="Déconnexion"
        >
          <FiLogOut  />
        </button>
      </div>
    </aside>
  );
}
