import { useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  List,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface ToolbarBtnProps {
  onClick: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
}

const ToolbarBtn = ({ onClick, active, title, children }: ToolbarBtnProps) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className="p-1.5 rounded-lg transition-all duration-150 flex items-center justify-center"
    style={
      active
        ? {
            background: "linear-gradient(135deg, #89957F, #a8b49e)",
            color: "#fff",
            boxShadow: "0 2px 8px rgba(137, 149, 127, 0.3)",
          }
        : { color: "rgba(255,255,255,0.35)" }
    }
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.background = "rgba(137, 149, 127, 0.1)";
        e.currentTarget.style.color = "#89957F";
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "rgba(255,255,255,0.35)";
      }
    }}
  >
    {children}
  </button>
);

const Divider = () => (
  <div
    className="w-px h-5 mx-0.5 self-center"
    style={{ background: "rgba(137, 149, 127, 0.15)" }}
  />
);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div
      className="flex flex-wrap items-center gap-0.5 px-3 py-2.5 sticky top-0 z-10"
      style={{
        background: "rgba(14,11,20,0.95)",
        borderBottom: "1px solid rgba(137, 149, 127, 0.12)",
        backdropFilter: "blur(8px)",
      }}
    >
      <ToolbarBtn
        onClick={() => editor.chain().focus().undo().run()}
        title="Undo"
      >
        <Undo size={15} />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().redo().run()}
        title="Redo"
      >
        <Redo size={15} />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        title="Bold"
      >
        <Bold size={15} />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        title="Italic"
      >
        <Italic size={15} />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
        title="Inline Code"
      >
        <Code size={15} />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        <Heading1 size={15} />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={15} />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List size={15} />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        title="Blockquote"
      >
        <Quote size={15} />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
        title="Align Left"
      >
        <AlignLeft size={15} />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
        title="Align Center"
      >
        <AlignCenter size={15} />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
        title="Align Right"
      >
        <AlignRight size={15} />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn
        onClick={setLink}
        active={editor.isActive("link")}
        title="Insert Link"
      >
        <LinkIcon size={15} />
      </ToolbarBtn>
    </div>
  );
};

interface TextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export const TextEditor = ({ content, onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "underline cursor-pointer transition-colors",
          style: "color: #89957F;",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert focus:outline-none min-h-[300px] p-6 max-w-none text-sm leading-relaxed",
        style: "color: rgba(255,255,255,0.75);",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div
      className="w-full rounded-xl overflow-hidden transition-all duration-200 shadow-lg"
      style={{
        background: "linear-gradient(160deg, #18131f 0%, #0e0b14 100%)",
        border: "1px solid rgba(137, 149, 127, 0.15)",
      }}
    >
      <MenuBar editor={editor} />

      <div className="max-h-125 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 flex justify-between items-center"
        style={{
          borderTop: "1px solid rgba(137, 149, 127, 0.1)",
          background: "rgba(14,11,20,0.6)",
        }}
      >
        <span
          className="text-[10px] tracking-wide"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          <kbd
            className="px-1.5 py-0.5 rounded font-mono text-[10px]"
            style={{
              background: "rgba(137, 149, 127, 0.1)",
              color: "rgba(137, 149, 127, 0.6)",
            }}
          >
            ⌘B
          </kbd>{" "}
          Bold &nbsp;
          <kbd
            className="px-1.5 py-0.5 rounded font-mono text-[10px]"
            style={{
              background: "rgba(137, 149, 127, 0.1)",
              color: "rgba(137, 149, 127, 0.6)",
            }}
          >
            ⌘I
          </kbd>{" "}
          Italic
        </span>
        <span
          className="text-[10px]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          {editor?.storage.characterCount?.words?.() ?? 0} words
        </span>
      </div>
    </div>
  );
};

export default TextEditor;
