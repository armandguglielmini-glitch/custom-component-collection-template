import { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; //

// ✅ Composant principal
export const CustomizableTextArea: FC = () => {
  // Propriété exposée dans Retool (le texte)
  const [value, setValue] = Retool.useStateString({
    name: "value",
    defaultValue: "",
  });

  // Optionnel : taille du champ (exposée aussi)
  const [height] = Retool.useStateNumber({
    name: "height",
    defaultValue: 250,
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

