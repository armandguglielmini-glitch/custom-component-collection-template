import { FC } from "react";
import { Retool } from "@tryretool/custom-component-support";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize } from "./FontSize";
import "tippy.js/dist/tippy.css";
import "./tiptap.css"; // ton style custom

export const CustomizableTextArea: FC = () => {
  const [value, setValue] = Retool.useStateString({
    name: "value",
    label: "Texte",
    initialValue: "<p>Commencez à écrire ici...</p>",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontSize.configure({
        types: ["textStyle"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => setValue(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <EditorContent
        editor={editor}
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "12px",
          backgroundColor: "#fff",
          minHeight: "200px",
          fontFamily: "Inter, sans-serif",
        }}
      />

      {/* --- Bubble Menu --- */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 150 }}>
        <div
          style={{
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "4px 10px",
            display: "flex",
            gap: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          {/* Gras / Italique / Souligné */}
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <b>B</b>
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <i>I</i>
          </button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()}>
            <s>S</s>
          </button>

          {/* Titres */}
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val === "p") editor.chain().focus().setParagraph().run();
              else if (val === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run();
              else if (val === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run();
              else if (val === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            style={{
              border: "none",
              background: "transparent",
              fontFamily: "inherit",
            }}
          >
            <option value="p">Texte</option>
            <option value="h1">Titre 1</option>
            <option value="h2">Titre 2</option>
            <option value="h3">Titre 3</option>
          </select>

          {/* Taille de police */}
          <select
            onChange={(e) =>
              editor.chain().focus().setFontSize(e.target.value).run()
            }
            style={{
              border: "none",
              background: "transparent",
              fontFamily: "inherit",
            }}
          >
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="22px">22px</option>
          </select>
        </div>
      </BubbleMenu>
    </div>
  );
};
//
