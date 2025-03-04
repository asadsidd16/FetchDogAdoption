import DogLabel from "./DogLabel";
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

  return (
    <div
      style={{
        width: "100%",
        height: "420px",
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
          height: "70%",
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
            color: "#757ce8",
            margin: 0,
            fontSize: "15px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            marginBottom: 5,
          }}
        >
          {dog.name}
        </h3>
        <DogLabel age={dog.age} zip={dog.zip_code} breed={dog.breed} />
      </div>
      <div
        style={{
          padding: "5px",
          display: "flex",
          justifyContent: "right",
        }}
      >
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
