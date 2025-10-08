import { FC } from "react";
import { Retool } from "@tryretool/custom-component-support";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize } from "./FontSize";
import Select from "react-select";
import "tippy.js/dist/tippy.css";
import "./tiptap.css";

export const CustomizableTextArea: FC = () => {
  // 1️⃣ Valeur principale
  const [value, setValue] = Retool.useStateString({
    name: "value",
    label: "Texte",
    initialValue: "<p>Commencez à écrire ici...</p>",
  });

  // 2️⃣ Clé d’événement simulée
  const [updateKey, setUpdateKey] = Retool.useStateNumber({
    name: "updateKey",
    label: "Clé de mise à jour",
    initialValue: 0,
  });

  let timeout: NodeJS.Timeout;

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontSize.configure({ types: ["textStyle"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const html = editor.getHTML();
        setValue(html);           // ✅ Retool reçoit la nouvelle valeur
        setUpdateKey(Date.now()); // ✅ Retool détecte un changement
      }, 600);
    },
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
          <Select
            options={[
              { value: "p", label: "Texte", fontSize: 15 },
              { value: "h1", label: "Titre 1", fontSize: 22 },
              { value: "h2", label: "Titre 2", fontSize: 18 },
              { value: "h3", label: "Titre 3", fontSize: 16 },
            ]}
            defaultValue={{ value: "p", label: "Texte", fontSize: 15 }}
            onChange={(selected) => {
              const val = selected?.value;
              if (!val) return;
              if (val === "p") editor.chain().focus().setParagraph().run();
              else editor
                .chain()
                .focus()
                .toggleHeading({ level: Number(val.replace("h", "")) })
                .run();
            }}
            styles={{
              control: (base) => ({
                ...base,
                border: "none",
                boxShadow: "none",
                background: "transparent",
                minWidth: "130px",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }),
              singleValue: (base, state) => ({
                ...base,
                fontSize: state.data.fontSize,
                fontWeight: 500,
                color: "#1d1d1f",
              }),
              option: (base, state) => ({
                ...base,
                fontSize: state.data.fontSize,
                fontWeight: state.isSelected ? 600 : 400,
                backgroundColor: state.isSelected ? "#f3f1ed" : "white",
                color: "#1d1d1f",
                cursor: "pointer",
                ":hover": { backgroundColor: "#f3f1ed" },
              }),
              dropdownIndicator: (base) => ({ ...base, color: "#C8A77D" }),
            }}
          />

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
