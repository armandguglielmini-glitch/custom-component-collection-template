import { FC } from "react";
import { Retool } from "@tryretool/custom-component-support";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const CustomizableTextArea: FC = () => {
  // 🧠 Propriété principale (le texte)
  const [value, setValue] = Retool.useStateString({
    name: "value",
    label: "Texte",
    description: "Contenu de la zone de texte",
    initialValue: "",
  });

  // 📏 Propriété optionnelle (hauteur du composant)
  const [height] = Retool.useStateNumber({
    name: "height",
    label: "Hauteur",
    description: "Hauteur du composant en pixels",
    initialValue: 250,
  });

  return (
    <div style={{ width: "100%", height }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(content) => setValue(content)}
        style={{
          height: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
          fontFamily: "Inter, sans-serif",
        }}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote", "code-block"],
            ["clean"],
          ],
        }}
      />
    </div>
  );
};
