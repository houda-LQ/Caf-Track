// src/components/dashboard/KPIBox.jsx
export default function KPIBox({ title, value, icon }) {
  return (
    <div className="bg-cream rounded-xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition">
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-xl text-brown-coffee">{icon}</div>
    </div>
  );
}
