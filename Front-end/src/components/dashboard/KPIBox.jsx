export default function KPIBox({ title, value, subtitle }) {

  const isCurrency = title !== "Alertes Stock";

  return (
    <div className="bg-[#ECEFF1] border border-white p-6 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
      <h3 className="text-gray-500 font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-[#A0522D]">
        {value ?? 0} {isCurrency ? "MAD" : ""}
      </p>
      {subtitle && <p className=" text-sm mt-1 text-[#834528]">{subtitle}</p>}
    </div>
  );
}
