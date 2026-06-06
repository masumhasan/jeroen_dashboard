import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useGetBookAccessRequestsQuery,
  useApproveBookAccessRequestMutation,
  useRejectBookAccessRequestMutation,
  useRevokeBookAccessRequestMutation,
  type BookAccessRequest,
} from "@/services/api/bookAccessRequestApi";

const STATUS_TABS = ["All", "pending", "approved", "rejected", "revoked"] as const;
type StatusTab = (typeof STATUS_TABS)[number];

const statusLabel: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  revoked: "Revoked",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  revoked: "bg-gray-100 text-gray-600",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface RejectModalProps {
  request: BookAccessRequest;
  onClose: () => void;
  onConfirm: (note: string) => void;
  loading: boolean;
}

function RejectModal({ request, onClose, onConfirm, loading }: RejectModalProps) {
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Reject Request</h2>
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-medium text-gray-700">{request.bookTitle}</span> —{" "}
          {request.requestEmail}
        </p>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Rejection note <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#89957F]"
          rows={4}
          placeholder="Explain why access is being rejected..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(note)}
            disabled={!note.trim() || loading}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition"
          >
            {loading ? "Rejecting…" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookAccessRequestsPage() {
  const [activeStatus, setActiveStatus] = useState<StatusTab>("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState<BookAccessRequest | null>(null);

  const { data, isLoading, isError, refetch, isFetching } = useGetBookAccessRequestsQuery({
    status: activeStatus,
    search: debouncedSearch,
    page,
  });

  const [approve, { isLoading: approving }] = useApproveBookAccessRequestMutation();
  const [reject, { isLoading: rejecting }] = useRejectBookAccessRequestMutation();
  const [revoke, { isLoading: revoking }] = useRevokeBookAccessRequestMutation();

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
    clearTimeout((handleSearch as any).__t);
    (handleSearch as any).__t = setTimeout(() => setDebouncedSearch(val), 400);
  };

  const handleStatusChange = (s: StatusTab) => {
    setActiveStatus(s);
    setPage(1);
  };

  const handleApprove = async (req: BookAccessRequest) => {
    try {
      await approve(req._id).unwrap();
      toast.success(`Access granted for "${req.bookTitle}"`);
    } catch {
      toast.error("Failed to approve request");
    }
  };

  const handleRevoke = async (req: BookAccessRequest) => {
    if (!window.confirm(`Revoke access to "${req.bookTitle}" for ${req.requestEmail}?`)) return;
    try {
      await revoke(req._id).unwrap();
      toast.success(`Access revoked for "${req.bookTitle}"`);
    } catch {
      toast.error("Failed to revoke access");
    }
  };

  const handleRejectConfirm = async (note: string) => {
    if (!rejectTarget) return;
    try {
      await reject({ id: rejectTarget._id, adminNote: note }).unwrap();
      toast.success("Request rejected");
      setRejectTarget(null);
    } catch {
      toast.error("Failed to reject request");
    }
  };

  const requests = data?.requests ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalResults = data?.totalResults ?? 0;

  return (
    <div className="min-h-screen p-6 space-y-5" style={{ background: "#fff" }}>
      {/* Header */}
      <div>
        <h1 className="text-xl font-black tracking-tight text-black">
          Book Access Requests
        </h1>
        <p className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em] text-black">
          {totalResults.toLocaleString()} request{totalResults !== 1 ? "s" : ""}
        </p>
      </div>

      {isError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          Failed to load requests.{" "}
          <button onClick={refetch} className="underline font-medium">Retry</button>
        </div>
      )}

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by email, book or note…"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-[#89957F]"
        />
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map((s) => (
          <button
            key={s}
            onClick={() => handleStatusChange(s)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition"
            style={
              activeStatus === s
                ? { background: "#89957F", color: "#fff" }
                : { background: "#f3f4f6", color: "#374151" }
            }
          >
            {s === "All" ? "All" : statusLabel[s]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        className={`transition-opacity duration-200 ${isFetching ? "opacity-50 pointer-events-none" : ""}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
            Loading…
          </div>
        ) : requests.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
            No requests found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">Date</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">Account</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">Request Email</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">Book</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">Note</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50/60 transition">
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(req.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      {req.userId ? (
                        <div>
                          <p className="font-medium text-gray-800">
                            {req.userId.firstName} {req.userId.lastName}
                          </p>
                          <p className="text-gray-400 text-xs">{req.userId.email}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-700">{req.requestEmail}</td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{req.bookTitle}</p>
                        <p className="text-gray-400 text-xs font-mono">{req.bookSku}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 max-w-[240px]">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {req.note || <span className="text-gray-300 italic">No note</span>}
                      </p>
                      {req.adminNote && (
                        <p className="text-red-500 text-xs mt-1 italic">
                          Admin note: {req.adminNote}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[req.status] ?? ""}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {req.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(req)}
                            disabled={approving}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectTarget(req)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {req.status === "approved" && (
                        <button
                          onClick={() => handleRevoke(req)}
                          disabled={revoking}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-50 transition"
                        >
                          Revoke Access
                        </button>
                      )}
                      {(req.status === "rejected" || req.status === "revoked") && (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Reject modal */}
      {rejectTarget && (
        <RejectModal
          request={rejectTarget}
          onClose={() => setRejectTarget(null)}
          onConfirm={handleRejectConfirm}
          loading={rejecting}
        />
      )}
    </div>
  );
}
