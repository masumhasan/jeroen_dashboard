import {
  useCreateAllergyMutation,
  useDeleteAllergyMutation,
  useGetAllergiesQuery,
  useUpdateAllergyMutation,
} from "@/services/api/allergyApi";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

export default function AllergyManagementPage() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: items = [], isLoading, isFetching } = useGetAllergiesQuery({ search });
  const [createItem, { isLoading: isCreating }] = useCreateAllergyMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateAllergyMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteAllergyMutation();

  const canSubmit = useMemo(
    () => name.trim().length >= 2 && !isCreating && !isUpdating,
    [name, isCreating, isUpdating],
  );

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const onSubmit = async () => {
    if (!canSubmit) return;
    const payload = { name: name.trim(), description: description.trim() };
    if (editingId) {
      await updateItem({ id: editingId, ...payload }).unwrap();
    } else {
      await createItem(payload).unwrap();
    }
    resetForm();
  };

  return (
    <div className="min-h-screen p-6 space-y-5" style={{ background: "#fff" }}>
      <div>
        <h1 className="text-xl font-black tracking-tight text-black">Allergies Management</h1>
        <p className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em] text-black">
          {items.length.toLocaleString()} items
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Allergy / ingredient name"
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: "#89957F" }}
          >
            <Plus size={16} />
            {editingId ? "Update" : "Add Allergy"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold border border-gray-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search allergies..."
        className="w-full max-w-md border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
      />

      <div className={`rounded-2xl border border-gray-100 overflow-hidden ${isFetching ? "opacity-60" : ""}`}>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td className="px-4 py-6" colSpan={3}>Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-4 py-6 text-gray-500" colSpan={3}>No allergies found.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-semibold">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600">{item.description || "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingId(item._id);
                          setName(item.name || "");
                          setDescription(item.description || "");
                        }}
                        className="px-2.5 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        disabled={isDeleting}
                        className="px-2.5 py-2 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
