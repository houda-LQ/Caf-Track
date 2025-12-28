import { useEffect } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import { useAuthStore } from "../store/authStore";
import KPIBox from "../components/dashboard/KPIBox";
import TopProductsBarChart from "../components/dashboard/TopProductsBarChart";
import SalesEvolutionLine from "../components/dashboard/SalesEvolutionLine";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import LowStockAlerts from "../components/dashboard/LowStockAlerts";

export default function Dashboard() {
  const { fetchDashboard, cards, charts, stocksFaibles, loading } = useDashboardStore();
  const { user } = useAuthStore(); 
  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      
      {/* Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold text-[#37474F]">CaféTrack – Tableau de bord</h1>
        <p className="text-gray-600 text-l">Vue d'ensemble des performances de votre Coffee Boutique</p>
        <p className="text-gray-700 text-3xl">
          Bonjour, <span className="font-semibold text-[#DD8467]">{user?.name}</span> 
        </p>
        <h1 className="text-xs text-gray-600">Explorez vos données, optimisez vos stocks et développez votre Coffee Boutique.</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPIBox 
          title="Ventes du Jour" 
          value={cards.ventesJour?.total} 
          subtitle={`Bénéfice: ${cards.ventesJour?.benefice}`} 
        />
        <KPIBox 
          title="Ventes du Mois" 
          value={cards.ventesMois?.total} 
          subtitle={`Bénéfice: ${cards.ventesMois?.benefice}`} 
        />
        <KPIBox 
          title="Bénéfice Net" 
          value={cards.beneficeNet?.total} 
          subtitle={`Marge: ${cards.beneficeNet?.marge}%`} 
        />
        <KPIBox 
          title="Alertes Stock" 
          value={cards.alertesStock} 
          subtitle="Produits à réapprovisionner" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopProductsBarChart data={charts.topProduits} />
        <SalesEvolutionLine data={charts.evolutionVentes} />
        <CategoryPieChart data={charts.ventesParCategorie} />
      </div>

      {/* Low Stock Alerts */}
      <LowStockAlerts data={stocksFaibles} />
    </div>
  );
}
