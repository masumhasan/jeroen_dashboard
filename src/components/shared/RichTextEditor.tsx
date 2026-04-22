import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image,
  Minus,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  minHeight?: number;
}

const FONT_SIZES = ["10", "12", "14", "16", "18", "20", "24", "28", "32"];

const ToolBtn = ({
  onClick,
  title,
  active,
  children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    className="w-7 h-7 flex items-center justify-center rounded-md text-xs"
    style={{
      background: active ? "rgba(228,123,53,0.15)" : "transparent",
      color: active ? "#89957F" : "#9ca3af",
      border: active
        ? "1px solid rgba(228,123,53,0.4)"
        : "1px solid transparent",
      transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
      transform: active ? "scale(1.1)" : "scale(1)",
    }}
    onMouseEnter={(e) => {
      const btn = e.currentTarget as HTMLButtonElement;
      if (!active) {
        btn.style.background = "rgba(228,123,53,0.08)";
        btn.style.color = "#89957F";
        btn.style.transform = "scale(1.15) rotate(-3deg)";
        btn.style.border = "1px solid rgba(228,123,53,0.25)";
      }
    }}
    onMouseLeave={(e) => {
      const btn = e.currentTarget as HTMLButtonElement;
      if (!active) {
        btn.style.background = "transparent";
        btn.style.color = "#9ca3af";
        btn.style.transform = "scale(1)";
        btn.style.border = "1px solid transparent";
      }
    }}
  >
    {children}
  </button>
);

const Divider = () => (
  <div
    className="w-px h-4 mx-1 self-center"
    style={{
      background:
        "linear-gradient(to bottom, transparent, rgba(228,123,53,0.25), transparent)",
    }}
  />
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  minHeight = 320,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState("12");
  const [isFocused, setIsFocused] = useState(false);
  const [activeCommands, setActiveCommands] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const updateActiveCommands = () => {
    const cmds = [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
    ];
    const active = new Set<string>();
    cmds.forEach((cmd) => {
      try {
        if (document.queryCommandState(cmd)) active.add(cmd);
      } catch { }
    });
    setActiveCommands(active);
  };

  const exec = useCallback(
    (command: string, val?: string) => {
      document.execCommand(command, false, val);
      editorRef.current?.focus();
      if (editorRef.current) onChange(editorRef.current.innerHTML);
      updateActiveCommands();
    },
    [onChange],
  );

  const isActive = (cmd: string) => activeCommands.has(cmd);

  const handleImageInsert = () => {
    const url = prompt("Enter image URL:");
    if (url) exec("insertImage", url);
  };

  const handleFontSize = (size: string) => {
    setFontSize(size);
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      exec("fontSize", "7");
      const fontEls = editorRef.current?.querySelectorAll('font[size="7"]');
      fontEls?.forEach((el) => {
        (el as HTMLElement).removeAttribute("size");
        (el as HTMLElement).style.fontSize = `${size}px`;
      });
    }
  };

  return (
    <>
      <style>{`
        @keyframes editorFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes toolbarSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40%           { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes focusRing {
          0%, 100% { box-shadow: 0 0 0 3px rgba(228,123,53,0.1), 0 4px 24px rgba(228,123,53,0.08); }
          50%       { box-shadow: 0 0 0 3px rgba(228,123,53,0.2), 0 8px 32px rgba(228,123,53,0.12); }
        }
        .editor-wrapper {
          animation: editorFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .toolbar-wrap {
          animation: toolbarSlideIn 0.35s ease both;
        }
        .rich-editor {
          caret-color: #89957F;
        }
        .rich-editor::selection {
          background: rgba(228,123,53,0.2);
        }
        .rich-editor:empty:before {
          content: attr(data-placeholder);
          color: #d1d5db;
          pointer-events: none;
        }
        .font-select option {
          background: #ffffff;
          color: #374151;
        }
      `}</style>

      <div
        className="editor-wrapper rounded-xl overflow-hidden flex flex-col"
        style={{
          border: isFocused
            ? "1.5px solid rgba(228,123,53,0.5)"
            : "1.5px solid #e5e7eb",
          background: "#ffffff",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isFocused
            ? "0 0 0 3px rgba(228,123,53,0.1), 0 8px 32px rgba(0,0,0,0.08)"
            : "0 2px 12px rgba(0,0,0,0.06)",
          animation: isFocused
            ? "focusRing 2.5s ease-in-out infinite"
            : undefined,
        }}
      >
        {/* ─── Toolbar ─────────────────────────────────────── */}
        <div
          className="toolbar-wrap flex items-center gap-0.5 px-3 py-2 flex-wrap"
          style={{
            borderBottom: "1.5px solid #f3f4f6",
            background: "#fafafa",
          }}
        >
          {/* Bouncing dots */}
          <div className="flex items-center gap-1 mr-2">
            {[0, 150, 300].map((delay) => (
              <div
                key={delay}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#89957F",
                  animation: `dotBounce 1.4s ease-in-out ${delay}ms infinite`,
                }}
              />
            ))}
          </div>

          <Divider />

          <ToolBtn onClick={handleImageInsert} title="Insert Image">
            <Image size={13} />
          </ToolBtn>

          {/* Font size */}
          <div className="relative mx-1">
            <select
              value={fontSize}
              onChange={(e) => handleFontSize(e.target.value)}
              className="font-select appearance-none text-[11px] px-2 py-1 rounded-md outline-none cursor-pointer"
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                color: "#374151",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#89957F";
                e.currentTarget.style.boxShadow =
                  "0 0 0 2px rgba(228,123,53,0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {FONT_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}px
                </option>
              ))}
            </select>
          </div>

          <Divider />

          <ToolBtn
            onClick={() => exec("bold")}
            title="Bold"
            active={isActive("bold")}
          >
            <Bold size={13} />
          </ToolBtn>
          <ToolBtn
            onClick={() => exec("italic")}
            title="Italic"
            active={isActive("italic")}
          >
            <Italic size={13} />
          </ToolBtn>
          <ToolBtn
            onClick={() => exec("underline")}
            title="Underline"
            active={isActive("underline")}
          >
            <Underline size={13} />
          </ToolBtn>
          <ToolBtn
            onClick={() => exec("strikeThrough")}
            title="Strikethrough"
            active={isActive("strikeThrough")}
          >
            <Strikethrough size={13} />
          </ToolBtn>

          <Divider />

          <ToolBtn
            onClick={() => exec("justifyLeft")}
            title="Align Left"
            active={isActive("justifyLeft")}
          >
            <AlignLeft size={13} />
          </ToolBtn>
          <ToolBtn
            onClick={() => exec("justifyCenter")}
            title="Align Center"
            active={isActive("justifyCenter")}
          >
            <AlignCenter size={13} />
          </ToolBtn>
          <ToolBtn
            onClick={() => exec("justifyRight")}
            title="Align Right"
            active={isActive("justifyRight")}
          >
            <AlignRight size={13} />
          </ToolBtn>

          <Divider />

          <ToolBtn
            onClick={() => exec("insertUnorderedList")}
            title="Bullet List"
          >
            <List size={13} />
          </ToolBtn>
          <ToolBtn
            onClick={() => exec("insertOrderedList")}
            title="Numbered List"
          >
            <ListOrdered size={13} />
          </ToolBtn>
          <ToolBtn
            onClick={() => exec("insertHorizontalRule")}
            title="Horizontal Rule"
          >
            <Minus size={13} />
          </ToolBtn>

          {/* Status badge */}
          <div
            className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: isFocused ? "rgba(228,123,53,0.08)" : "#f3f4f6",
              border: `1px solid ${isFocused ? "rgba(228,123,53,0.3)" : "#e5e7eb"}`,
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: isFocused ? "#89957F" : "#d1d5db",
                boxShadow: isFocused ? "0 0 6px #89957F" : "none",
                transition: "all 0.3s ease",
              }}
            />
            <span
              style={{
                fontSize: 9,
                color: isFocused ? "#89957F" : "#9ca3af",
                letterSpacing: "0.06em",
                fontWeight: 600,
                transition: "color 0.3s ease",
              }}
            >
              {isFocused ? "EDITING" : "READY"}
            </span>
          </div>
        </div>

        {/* ─── Editable area ─────────────────────────────── */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Start writing something amazing..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyUp={updateActiveCommands}
          onMouseUp={updateActiveCommands}
          onInput={() => {
            if (editorRef.current) onChange(editorRef.current.innerHTML);
          }}
          className="rich-editor outline-none px-5 py-4 text-sm leading-relaxed"
          style={{
            minHeight,
            color: "#111827",
            caretColor: "#89957F",
            background: "#ffffff",
          }}
        />

        {/* ─── Footer ────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 py-1.5"
          style={{
            borderTop: "1.5px solid #f3f4f6",
            background: "#fafafa",
          }}
        >
          <span style={{ fontSize: 10, color: "#d1d5db", fontWeight: 500 }}>
            Editor
          </span>
          <span style={{ fontSize: 10, color: "#89957F", opacity: 0.6 }}>
            ✦ rich text
          </span>
        </div>
      </div>
    </>
  );
};

export default RichTextEditor;
