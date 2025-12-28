import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SalesEvolutionLine({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-2">Évolution des ventes (7 derniers jours)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ventes" stroke="#704232" />
          <Line type="monotone" dataKey="benefice" stroke="#10B981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
