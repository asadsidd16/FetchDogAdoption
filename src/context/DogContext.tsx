import { createContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the authentication state
interface DogContextType {
  listOfDogsMatch: string[];
  setListOfDogsMatch: any;
}

// Create the context with default values
export const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [listOfDogsMatch, setListOfDogsMatch] = useState<string[]>([]);

  return (
    <DogContext.Provider value={{ listOfDogsMatch, setListOfDogsMatch }}>
      {children}
    </DogContext.Provider>
  );
};
