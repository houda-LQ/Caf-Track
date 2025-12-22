import { useSalesStore } from "../../store/salesStore";

export default function SalesCards() {
  const { stats } = useSalesStore();

  const nombre = stats?.nombre_ventes ?? 0;
  const chiffre = stats?.chiffre_affaires ?? 0;
  const benefice = stats?.benefice_net ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      {/* Nombre de ventes */}
      <div className="bg-[#ECEFF1] border border-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">Nombre de ventes</p>
        <h2 className="text-3xl font-light text-gray-700">
          {nombre}
        </h2>
      </div>

      {/* Chiffre d'affaires */}
      <div className="bg-[#ECEFF1] border border-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">Chiffre d'affaires</p>
        <h2 className="text-3xl font-light text-gray-700">
          {chiffre.toLocaleString("fr-FR", { style: "currency", currency: "MAD" })}
        </h2>
      </div>

      {/* Bénéfice net */}
      <div className="bg-[#ECEFF1] border border-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">Bénéfice net</p>
        <h2 className="text-3xl font-light text-[#00A63D]">
          {benefice.toLocaleString("fr-FR", { style: "currency", currency: "MAD" })}
        </h2>
      </div>

    </div>
  );
}
