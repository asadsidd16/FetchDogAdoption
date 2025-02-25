import api from "./api";
import { Dog } from "../types";

export const fetchDogs = async() => {
    try{
        const res = await api.get("/dogs/search");
        return res.data
    }catch(error){
        throw new Error("Cannt fetch all dogs")
    }
}
