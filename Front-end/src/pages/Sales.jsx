import { useEffect, useState } from "react";
import { useSalesStore } from "../store/salesStore";

import SalesCards from "../components/sales/SalesCards";
import SalesFilter from "../components/sales/SalesFilter";
import SalesTable from "../components/sales/SalesTable";
import NewSaleButton from "../components/sales/NewSaleButton";
import SaleForm from "../components/sales/SaleForm";

export default function Sales() {
  const { fetchSales, fetchStats } = useSalesStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState("all");

 useEffect(() => {
  fetchSales(filter);
  fetchStats(filter);
}, [filter, fetchSales, fetchStats]);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#37474F]">
            CaféTrack – Gestion des Ventes
          </h1>
          <p className="text-gray-500">Enregistrez et suivez vos ventes</p>
        </div>

        <NewSaleButton onClick={() => setIsFormOpen(true)} />
      </div>

      <SalesCards />
      <SalesFilter filter={filter} setFilter={setFilter} />
      <SalesTable />

      {isFormOpen && <SaleForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}
