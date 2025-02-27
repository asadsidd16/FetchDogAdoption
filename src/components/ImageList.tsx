import { Dog } from "../types/dog";

interface CardProps {
  dog: Dog;
}

const ImageListDog = ({ dog }: CardProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "white",
      }}
    >
      <img
        srcSet={`${dog.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${dog.img}?w=248&fit=crop&auto=format`}
        alt={dog.name}
        loading="lazy"
        style={{
          width: "100%",
          height: "75%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          height: "25%",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "white",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis", // Prevents long names from breaking the layout
            width: "100%",
          }}
        >
          {dog.name}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#666",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis", // Prevents long breed names from breaking
            width: "100%",
          }}
        >
          {dog.breed}
        </p>
      </div>
    </div>
  );
};

export default ImageListDog;
