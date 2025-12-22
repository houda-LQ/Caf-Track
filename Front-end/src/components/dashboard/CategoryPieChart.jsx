import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#FF6B6B", "#4B3832", "#10B981", "#F59E0B"];

export default function CategoryPieChart({ data = [] }) {
  if (!data.length) return <p className="p-6">Pas de données</p>;

  return (
    <div className="bg-cream p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="text-gray-700 font-semibold mb-4">Répartition par Catégorie</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="total_sales" nameKey="category" outerRadius={80} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
