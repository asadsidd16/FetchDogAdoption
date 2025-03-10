import api from "./api";
import { LocationObject, LocationResponseObject } from "../types";

export const searchByZip = async (ids: string[]): Promise<LocationObject[]> => {
  try {
    const res = await api.post("/locations", ids);
    return res.data;
  } catch (error) {
    throw new Error("Cant search location...");
  }
};

export const locationSearch = async (
  filters: LocationObject
): Promise<LocationResponseObject> => {
  try {
    const res = await api.post("/location/search", {
      body: JSON.stringify(filters),
    });
    return res.data;
  } catch (error) {
    throw new Error("Cant search location...");
  }
};
