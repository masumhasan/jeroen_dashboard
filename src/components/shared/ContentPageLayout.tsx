import React from "react";
import RichTextEditor from "./RichTextEditor";
import ContentPageSkeleton from "../Skeletons/ContentPageSkeleton";

interface ContentPageLayoutProps {
  title: string;
  isLoading: boolean;
  isSaving: boolean;
  content: string;
  onContentChange: (val: string) => void;
  onSave: () => void;
}

const ContentPageLayout: React.FC<ContentPageLayoutProps> = ({
  title,
  isLoading,
  isSaving,
  content,
  onContentChange,
  onSave,
}) => {
  if (isLoading) return <ContentPageSkeleton title={title} />;

  return (
    <div
      className="min-h-screen p-6 flex flex-col gap-5"
      style={{ background: "#fff" }}
    >
      {/* ─── Header ──────────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-black tracking-tight text-black">
          {title}
        </h1>
        <p
          className="text-[11px] mt-0.5 font-medium uppercase tracking-[0.15em]"
          style={{ color: "#000" }}
        >
          Edit & save content
        </p>
      </div>

      {/* ─── Editor card ─────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "#89957F",
          border: "1px solid rgba(201,163,103,0.1)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Top accent */}
        <div
          className="h-[1.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,163,103,0.5), transparent)",
          }}
        />

        {/* Title inside card */}
        <div className="px-6 pt-5 pb-3">
          <h2 className="text-base font-black text-black tracking-tight">
            {title}
          </h2>
          <div
            className="mt-1 h-0.5 w-8 rounded-full"
            style={{ background: "linear-gradient(90deg, #C9A367, #E8C882)" }}
          />
        </div>

        {/* Editor */}
        <div className="px-6 pb-6">
          <RichTextEditor
            value={content}
            onChange={onContentChange}
            minHeight={340}
          />
        </div>
      </div>

      {/* ─── Save button ─────────────────────────────────────── */}
      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200"
        style={{
          background: isSaving ? "#89957F" : "#89957F",
          color: isSaving ? "rgba(255,255,255,0.4)" : "#fff",
          boxShadow: isSaving ? "none" : "0 4px 24px rgba(201,163,103,0.35)",
          cursor: isSaving ? "not-allowed" : "pointer",
        }}
      >
        {isSaving ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="w-4 h-4 rounded-full border-2 animate-spin"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                borderTopColor: "transparent",
              }}
            />
            Saving...
          </span>
        ) : (
          "Save"
        )}
      </button>
    </div>
  );
};

export default ContentPageLayout;
