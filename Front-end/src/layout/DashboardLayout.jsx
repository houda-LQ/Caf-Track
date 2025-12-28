import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {

  
  return (
    <div className="flex min-h-screen bg-gray-100 font-inter">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
