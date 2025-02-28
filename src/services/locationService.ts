import api from "./api";
import { LocationObject } from "../types";

export const location = async (ids: string[]): Promise<LocationObject> => {
  try {
    const res = await api.post("/locations", ids);
    return res.data;
  } catch (error) {
    throw new Error("Cant search location...");
  }
};

export const locationSearch = async (
  ids: string[]
): Promise<LocationObject> => {
  try {
    const res = await api.post("/location/search", ids);
    return res.data;
  } catch (error) {
    throw new Error("Cant search location...");
  }
};
