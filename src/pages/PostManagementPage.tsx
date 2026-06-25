import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/config/apiConfig";
import { TOKEN_KEY } from "@/services/hooks/useLogin";
import {
  Trash2,
  Heart,
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Utensils,
  RefreshCw,
} from "lucide-react";
import ServerConnectionError from "@/components/shared/ServerConnectionError";

interface PostUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

interface PostTopic {
  id: string;
  name: string;
  color: string;
}

interface AdminPost {
  id: string;
  content: string;
  postType: "text" | "meal_plan";
  image: string | null;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  user: PostUser | null;
  topic: PostTopic | null;
}

interface Meta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

const API_HOST = API_BASE_URL.replace("/api", "");

function resolveImageUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_HOST}${url}`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

function UserAvatar({ user }: { user: PostUser | null }) {
  const src = user?.avatar ? resolveImageUrl(user.avatar) : null;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  if (src) {
    return (
      <img
        src={src}
        alt={user?.name}
        className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white"
      style={{ background: "#89957F" }}
    >
      {initials}
    </div>
  );
}

function DeleteConfirmModal({
  open,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4">
        <h3 className="text-base font-bold text-black mb-1">Delete Post</h3>
        <p className="text-sm text-gray-500 mb-6">
          This post will be permanently removed. This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50"
            style={{ background: "#ef4444" }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PostManagementPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: "20",
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      });
      const res = await fetch(`${API_BASE_URL}/admin/posts?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const json = await res.json();
      setPosts(json.data?.posts || []);
      setMeta(
        json.data?.meta || { page: 1, limit: 20, totalCount: 0, totalPages: 1 }
      );
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (postId: string) => {
    setDeletingId(postId);
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch(`${API_BASE_URL}/admin/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Post deleted successfully.");
      setConfirmId(null);
      void fetchPosts();
    } catch {
      toast.error("Could not delete post. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-5" style={{ background: "#fff" }}>
      <DeleteConfirmModal
        open={confirmId !== null}
        onConfirm={() => confirmId && handleDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
        isDeleting={deletingId !== null}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-black">
            Post Management
          </h1>
          <p
            className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em]"
            style={{ color: "#000" }}
          >
            {meta.totalCount.toLocaleString()} posts found
          </p>
        </div>
        <button
          onClick={() => void fetchPosts()}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50"
          style={{ background: "#89957F" }}
        >
          <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl border"
        style={{ borderColor: "rgba(0,0,0,0.1)", background: "#fafafa" }}
      >
        <Search size={16} style={{ color: "#89957F" }} />
        <input
          type="text"
          placeholder="Search posts by content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm bg-transparent outline-none text-black placeholder-gray-400"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Clear
          </button>
        )}
      </div>

      {isError && <ServerConnectionError onRetry={fetchPosts} />}

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-xl animate-pulse"
              style={{ background: "#f3f4f6" }}
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">
          {debouncedSearch
            ? "No posts match your search."
            : "No posts found."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr
                className="text-left text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{
                  background: "#f9fafb",
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                  color: "#6b7280",
                }}
              >
                <th className="px-4 py-3 w-16">Image</th>
                <th className="px-4 py-3">Caption</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3 whitespace-nowrap">Date & Time</th>
                <th className="px-4 py-3">Stats</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => {
                const imgUrl = resolveImageUrl(post.image);
                return (
                  <tr
                    key={post.id}
                    className="transition-colors hover:bg-gray-50"
                    style={{
                      borderBottom:
                        idx < posts.length - 1
                          ? "1px solid rgba(0,0,0,0.05)"
                          : "none",
                    }}
                  >
                    {/* Image */}
                    <td className="px-4 py-3">
                      {post.postType === "meal_plan" ? (
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: "#f0f4ee" }}
                          title="Meal Plan Post"
                        >
                          <Utensils size={20} style={{ color: "#89957F" }} />
                        </div>
                      ) : imgUrl ? (
                        <img
                          src={imgUrl}
                          alt="post"
                          className="w-12 h-12 rounded-xl object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: "#f3f4f6" }}
                        >
                          <ImageIcon size={18} style={{ color: "#d1d5db" }} />
                        </div>
                      )}
                    </td>

                    {/* Caption */}
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-black font-medium text-[13px] line-clamp-2 leading-snug">
                        {post.content || (
                          <span className="text-gray-400 italic">No caption</span>
                        )}
                      </p>
                      {post.postType === "meal_plan" && (
                        <span
                          className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: "#f0f4ee", color: "#89957F" }}
                        >
                          Meal Plan
                        </span>
                      )}
                    </td>

                    {/* User */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <UserAvatar user={post.user} />
                        <div className="min-w-0">
                          <p className="text-black font-semibold text-[13px] truncate max-w-[140px]">
                            {post.user?.name || "Unknown"}
                          </p>
                          <p className="text-gray-400 text-[11px] truncate max-w-[140px]">
                            {post.user?.email || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Topic */}
                    <td className="px-4 py-3">
                      {post.topic ? (
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white whitespace-nowrap"
                          style={{
                            background: post.topic.color || "#89957F",
                          }}
                        >
                          {post.topic.name}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>

                    {/* Date & Time */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-black text-[13px] font-medium">
                        {formatDate(post.createdAt)}
                      </p>
                      <p className="text-gray-400 text-[11px]">
                        {formatTime(post.createdAt)}
                      </p>
                    </td>

                    {/* Stats */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[12px] text-gray-500">
                          <Heart size={13} style={{ color: "#e57373" }} />
                          {post.likeCount}
                        </span>
                        <span className="flex items-center gap-1 text-[12px] text-gray-500">
                          <MessageCircle size={13} style={{ color: "#89957F" }} />
                          {post.commentCount}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setConfirmId(post.id)}
                        disabled={deletingId === post.id}
                        className="p-2 rounded-xl text-red-400 hover:text-white hover:bg-red-500 transition-all duration-200 disabled:opacity-40"
                        title="Delete post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2 pb-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1 || isLoading}
            className="p-2 rounded-xl border transition-colors disabled:opacity-30"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 ||
                p === meta.totalPages ||
                Math.abs(p - currentPage) <= 2
            )
            .reduce<(number | "...")[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((item, i) =>
              item === "..." ? (
                <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item as number)}
                  disabled={isLoading}
                  className="min-w-9 h-9 rounded-xl text-sm font-semibold transition-all border"
                  style={
                    currentPage === item
                      ? {
                          background: "#89957F",
                          color: "#fff",
                          borderColor: "#89957F",
                        }
                      : {
                          background: "transparent",
                          color: "#374151",
                          borderColor: "rgba(0,0,0,0.1)",
                        }
                  }
                >
                  {item}
                </button>
              )
            )}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, meta.totalPages))
            }
            disabled={currentPage >= meta.totalPages || isLoading}
            className="p-2 rounded-xl border transition-colors disabled:opacity-30"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
