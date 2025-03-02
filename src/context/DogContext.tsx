import { createContext, useState, ReactNode } from "react";
import { Dog } from "../types";

// Define the shape of the authentication state
interface DogContextType {
  listOfDogsMatch: string[];
  setListOfDogsMatch: React.Dispatch<React.SetStateAction<string[]>>;
  matchedDog: Dog[];
  setMatchedDog: React.Dispatch<React.SetStateAction<Dog[]>>;
}

// Create the context with default values
export const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [listOfDogsMatch, setListOfDogsMatch] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog[]>([]);

  return (
    <DogContext.Provider
      value={{ listOfDogsMatch, setListOfDogsMatch, matchedDog, setMatchedDog }}
    >
      {children}
    </DogContext.Provider>
  );
};
