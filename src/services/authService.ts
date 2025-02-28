import api from "./api";

export const login = async (name: string, email: string) => {
  try {
    const res = await api.post("/auth/login", { name, email });

    return res.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    throw new Error("Logout failed");
  }
};
