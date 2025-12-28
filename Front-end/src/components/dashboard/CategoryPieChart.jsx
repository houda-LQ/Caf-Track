import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#704232", "#FBBF24", "#10B981", "#3B82F6", "#F87171"];

export default function CategoryPieChart({ data }) {
  if (!data || data.length === 0) return <div>Chargement...</div>;

  // Si toutes les valeurs sont 0, afficher un message
  const totalSum = data.reduce((sum, d) => sum + d.total, 0);
  if (totalSum === 0) return <div>Aucune donnée à afficher</div>;

  return (
        <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-2">Ventes par catégorie</h3>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="total"
          nameKey="category"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#704232"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} MAD`} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
}
