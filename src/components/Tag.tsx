
import "../Styles/Tag.css"; // Archivo CSS para los estilos

interface TagProps {
    text: string;
    backgroundColor: string;
    textColor?: string;
    }

const Tag = ({ text, backgroundColor, textColor = "white" }: TagProps) => {
  return (
    <div
      className="tag"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      {text}
    </div>
  );
};

export default Tag;