import api from "./api";
import { Dog, DogSearchResponse } from "../types";

export const fetchDogsId = async (): Promise<DogSearchResponse> => {
    try{
        const res = await api.get("/dogs/search");
        return res.data
    }catch(error){
        throw new Error("Cant fetch dogs...")
    }
}

export const fetchDogsData = async (ids: string[]): Promise<Dog[]> => {
    try{
        const res = await api.post("/dogs", ids);
        return res.data
    }catch(error){
        throw new Error("Cant fetch dogs...")
    }
}