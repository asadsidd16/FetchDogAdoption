import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { fetchDogs } from "../services/dogService";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Dog } from "../types/dog";

const Home = () => {
  const navigate = useNavigate();

  const [allDogs, setAllDogs] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const fetchAllDogs = async () => {
    // Fetch dog data from API and return as an array of Dog objects
    const allDogs = await fetchDogs();

    setAllDogs(allDogs);
  };

  useEffect(() => {
    fetchAllDogs();
  }, []);

  return (
    <div>
      Home
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;
