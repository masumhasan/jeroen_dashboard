import {
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useGetTopicsQuery,
  useUpdateTopicMutation,
} from "@/services/api/topicApi";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

const PRESET_TOPIC_COLORS = [
  "#89957F",
  "#7E8B77",
  "#D8CF8E",
  "#9C8F82",
  "#D87C5A",
  "#5D7B9D",
  "#8E7BB5",
  "#5E9E84",
];

export default function TopicManagementPage() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#89957F");
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: topics = [], isLoading, isFetching } = useGetTopicsQuery({ search });
  const [createTopic, { isLoading: isCreating }] = useCreateTopicMutation();
  const [updateTopic, { isLoading: isUpdating }] = useUpdateTopicMutation();
  const [deleteTopic, { isLoading: isDeleting }] = useDeleteTopicMutation();

  const canSubmit = useMemo(
    () => name.trim().length >= 2 && !isCreating && !isUpdating,
    [name, isCreating, isUpdating]
  );

  const handleColorInputChange = (value: string) => {
    setColor(value);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setColor("#89957F");
    setEditingId(null);
  };

  const onSubmit = async () => {
    if (!canSubmit) return;
    const payload = {
      name: name.trim(),
      description: description.trim(),
      color: color.trim() || "#89957F",
    };
    if (editingId) {
      await updateTopic({ id: editingId, ...payload }).unwrap();
    } else {
      await createTopic(payload).unwrap();
    }
    resetForm();
  };

  return (
    <div className="min-h-screen p-6 space-y-5" style={{ background: "#fff" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-black">Topic Management</h1>
          <p className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em] text-black">
            {topics.length.toLocaleString()} topics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Topic name"
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
        />
        <div className="border border-gray-200 rounded-xl px-3 py-2">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorInputChange(e.target.value)}
              className="w-8 h-8 p-0 border border-gray-200 rounded-md cursor-pointer bg-transparent"
              title="Pick topic color"
            />
            <input
              value={color}
              onChange={(e) => handleColorInputChange(e.target.value)}
              placeholder="#89957F"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {PRESET_TOPIC_COLORS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setColor(preset)}
                className="w-5 h-5 rounded-full border border-gray-300"
                style={{
                  background: preset,
                  boxShadow: color.toLowerCase() === preset.toLowerCase()
                    ? "0 0 0 2px #11111120"
                    : "none",
                }}
                title={preset}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: "#89957F" }}
          >
            <Plus size={16} />
            {editingId ? "Update Topic" : "Add Topic"}
          </button>
          {editingId ? (
            <button
              onClick={resetForm}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold border border-gray-200"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search topics..."
          className="w-full max-w-md border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
        />
      </div>

      <div className={`rounded-2xl border border-gray-100 overflow-hidden ${isFetching ? "opacity-60" : ""}`}>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3">Topic</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">Followers</th>
              <th className="text-left px-4 py-3">Color</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-4 py-6" colSpan={5}>Loading topics...</td>
              </tr>
            ) : topics.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={5}>No topics found.</td>
              </tr>
            ) : (
              topics.map((topic) => (
                <tr key={topic._id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-semibold">{topic.name}</td>
                  <td className="px-4 py-3 text-gray-600">{topic.description || "-"}</td>
                  <td className="px-4 py-3">{topic.followerCount || 0}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full border border-gray-200"
                        style={{ background: topic.color || "#89957F" }}
                      />
                      {topic.color || "#89957F"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingId(topic._id);
                          setName(topic.name || "");
                          setDescription(topic.description || "");
                          setColor(topic.color || "#89957F");
                        }}
                        className="px-2.5 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                        title="Edit topic"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteTopic(topic._id)}
                        disabled={isDeleting}
                        className="px-2.5 py-2 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        title="Delete topic"
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
