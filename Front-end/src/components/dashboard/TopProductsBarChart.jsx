import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TopProductsBarChart({ data = [] }) {
  if (!data.length) return <p className="p-6">Pas de données</p>;

  return (
    <div className="bg-cream p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="text-gray-700 font-semibold mb-4">Top 5 des Produits</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="product" stroke="#4B3832"/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_sales" fill="#FF6B6B" radius={[5,5,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
