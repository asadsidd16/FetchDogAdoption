import axios from "axios";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Ensures cookies are sent
});
  
export const login = async(name: string, email: string) => {
    try{
        const res = await api.post("/auth/login", {name, email})
        return res.data;
    }catch(error){
        throw new Error("Invalid credentials")
    }
}

export const logout = async() => {
    try{
        await api.post("/auth/logout");
    }catch(error){
        throw new Error("Logout failed")
    }
}

export default api;