import api from "./api";
import { Dog, DogSearchResponse, Match } from "../types";

export const fetchDogsId = async (filters: {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: string;
  from?: string | null;
  sort?: string;
}): Promise<DogSearchResponse> => {
  try {
    const params = new URLSearchParams();

    if (filters.breeds) {
      filters.breeds.forEach((breed) => params.append("breeds", breed));
    }
    if (filters.zipCodes) {
      filters.zipCodes.forEach((zip) => params.append("zipCodes", zip));
    }
    if (filters.ageMin !== undefined)
      params.append("ageMin", String(filters.ageMin));
    if (filters.ageMax !== undefined)
      params.append("ageMax", String(filters.ageMax));
    if (filters.size !== undefined) params.append("size", String(filters.size));
    if (filters.from) params.append("from", filters.from);
    if (filters.sort) params.append("sort", filters.sort);

    const res = await api.get(`/dogs/search?${params.toString()}`);

    return res.data;
  } catch (error) {
    throw new Error("Cant fetch dogs...");
  }
};

export const fetchDogsData = async (ids: string[]): Promise<Dog[]> => {
  try {
    const res = await api.post("/dogs", ids);
    return res.data;
  } catch (error) {
    throw new Error("Cant fetch dogs...");
  }
};

export const fetchDogsBreed = async (): Promise<string[]> => {
  try {
    const res = await api.get("/dogs/breeds");
    return res.data;
  } catch (error) {
    throw new Error("Cant fetch dog breeds...");
  }
};

export const dogsMatch = async (ids: string[]): Promise<Match> => {
  try {
    const res = await api.post("/dogs/match", ids);
    return res.data;
  } catch (error) {
    throw new Error("Cant match dogs...");
  }
};
