// src/components/suppliers/SuppliersTabs.jsx
export default function SuppliersTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => setActiveTab("suppliers")}
        className={`px-4 py-2 rounded ${
          activeTab === "suppliers"
            ? "bg-[#E4B385] text-[#704232]"
            : "bg-gray-200"
        }`}
      >
        Fournisseurs
      </button>

      <button
        onClick={() => setActiveTab("purchases")}
        className={`px-4 py-2 rounded ${
          activeTab === "purchases"
            ? "bg-[#E4B385] text-[#704232]"
            : "bg-gray-200"
        }`}
      >
        Achats
      </button>
    </div>
  );
}
