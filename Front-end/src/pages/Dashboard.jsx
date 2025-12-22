import { useEffect } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import DashboardLayout from "../layout/DashboardLayout";
import KPIBox from "../components/dashboard/KPIBox";
import TopProductsBarChart from "../components/dashboard/TopProductsBarChart";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import LowStockAlerts from "../components/dashboard/LowStockAlerts";
import { FiShoppingCart, FiBox, FiTrendingUp } from "react-icons/fi";


export default function Dashboard() {
  const { loading, data, charts, fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (!data) return <p className="p-6">Aucune donnée.</p>;

  return (
    <>
      {/* Header */}
      <h2 className="text-3xl font-bold text-[#37474F] mb-2">
        CaféTrack – Tableau de bord  
    </h2>
      <p className="text-gray-500 mb-6">Vue d'ensemble des performances de votre Coffee Boutique</p>

      <h1 className="text-3xl font-bold text-brown-coffee mb-2">
        Bonjour, {data.user_name}
      </h1>
      <p className="text-gray-500 mb-6">Explorez vos données, optimisez vos stocks et développez votre Coffee Boutique.</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPIBox title="Ventes du Jour" value={data.daily_sales} icon={<FiShoppingCart />} />
        <KPIBox title="Ventes du Mois" value={data.monthly_sales} icon={<FiBox />} />
        <KPIBox title="Bénéfice Net" value={`${data.net_profit} (${data.margin}%)`} icon={<FiTrendingUp />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopProductsBarChart data={charts.top5Products} />
        <CategoryPieChart data={charts.categorySales} />
        {/* Ici tu peux ajouter un graphique linéaire d'évolution */}
      </div>

      {/* Low Stock Alerts */}
      <LowStockAlerts products={data.low_stock} />
    </>
  );
}
