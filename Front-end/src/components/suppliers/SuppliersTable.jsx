import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useSupplierStore } from "../../store/supplierStore";
import { useAuthStore } from "../../store/authStore";

export default function SuppliersTable({ onEdit }) {
  const { suppliers, deleteSupplier } = useSupplierStore();
  const { user } = useAuthStore();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="th">Nom</th>
            <th className="th">Téléphone</th>
            <th className="th">Email</th>
            <th className="th">Adresse</th>
            {user?.role === "admin" && (
              <th className="th text-center">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {suppliers.map((s) => (
            <tr
              key={s.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="td font-medium">{s.name}</td>
              <td className="td">{s.phone}</td>
              <td className="td">{s.email}</td>
              <td className="td">{s.address}</td>

              {user?.role === "admin" && (
                <td className="td flex justify-center gap-3">
                  <FiEdit
                    onClick={() => onEdit(s)}
                    className="icon-action text-gray-600"
                  />
                  <FiTrash2
                    onClick={() => deleteSupplier(s.id)}
                    className="icon-action text-red-600"
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
