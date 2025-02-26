import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AlertDisplaySnackbar from "../components/AlertDisplay";

import { fetchDogsId, fetchDogsData } from "../services/dogService";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Dog } from "../types/dog";

const Home = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const fetchAllDogs = async () => {
    try {
      // Fetch dog data from API and return as an array of Dog objects
      const allDogsId = await fetchDogsId();

      if (allDogsId.resultIds && allDogsId.resultIds.length > 0) {
        const dogData = await fetchDogsData(allDogsId.resultIds);
        setAllDogs(dogData);
      }
    } catch (error) {
      setOpen(true);
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchAllDogs();
  }, []);

  return (
    <div>
      Home
      <Button onClick={handleLogout}>Logout</Button>
      <AlertDisplaySnackbar
        message={error}
        open={open}
        onClose={handleClose}
        severity="error"
      />
    </div>
  );
};

export default Home;
