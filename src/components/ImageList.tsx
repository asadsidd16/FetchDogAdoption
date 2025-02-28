import { useEffect } from "react";
import { Dog } from "../types/dog";

import { useDog } from "../hooks/useDog";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
interface CardProps {
  dog: Dog;
}

const ImageListDog = ({ dog }: CardProps) => {
  const { listOfDogsMatch, setListOfDogsMatch } = useDog();

  const isLiked = listOfDogsMatch.includes(dog.id);

  const toggleFavorite = (id: string) => {
    setListOfDogsMatch((prevList: string[]) =>
      prevList.includes(id)
        ? prevList.filter((favorite) => favorite !== id)
        : [...prevList, id]
    );
  };

  const deleteFromFavorite = (id: string) => {
    setListOfDogsMatch((prevList: string[]) =>
      prevList.filter((favorite) => favorite !== id)
    );
  };

  useEffect(() => {
    console.log("list", listOfDogsMatch);
  }, [listOfDogsMatch]);

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
          padding: "2px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "12px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            marginBottom: 10,
          }}
        >
          {dog.name}
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#666",
              whiteSpace: "normal",
              overflow: "visible",
              textOverflow: "unset",
              wordBreak: "break-word",
              maxWidth: "100%",
            }}
          >
            {dog.breed}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#666",
              whiteSpace: "normal",
              overflow: "visible",
              textOverflow: "unset",
              wordBreak: "break-word",
              maxWidth: "100%",
            }}
          >
            {dog.age} years
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#666",
              whiteSpace: "normal",
              overflow: "visible",
              textOverflow: "unset",
              wordBreak: "break-word",
              maxWidth: "100%",
            }}
          >
            {dog.zip_code}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end", padding: 5 }}>
        {isLiked ? (
          <span
            onClick={() => deleteFromFavorite(dog.id)}
            style={{ cursor: "pointer" }}
          >
            <FavoriteIcon fontSize="small" />
          </span>
        ) : (
          <span
            onClick={() => toggleFavorite(dog.id)}
            style={{ cursor: "pointer" }}
          >
            <FavoriteBorderOutlinedIcon fontSize="small" />
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageListDog;
