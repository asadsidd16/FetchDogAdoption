import { useContext } from "react";
import { DogContext } from "../context/DogContext";

export const useDog = () => {
  const context = useContext(DogContext);
  if (!context) {
    throw new Error("useDog must be used within an DogProvider");
  }
  return context;
};
