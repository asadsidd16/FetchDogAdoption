import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AlertDisplaySnackbar from "../components/AlertDisplay";
import ImageListDog from "../components/ImageList";
import BreedFilter from "../components/BreedFilter";
import Pagination from "@mui/material/Pagination";
import {
  fetchDogsId,
  fetchDogsData,
  fetchDogsBreed,
} from "../services/dogService";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Dog } from "../types/dog";

const Home = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [allDogBreeds, setAllDogBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

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
    setOpenAlert(false);
  };

  const fetchAllDogs = async () => {
    try {
      const params = {
        breeds: selectedBreeds,
        size: 25,
        sort: "age:asc",
      };
      // Fetch dog data from API and return as an array of Dog objects
      const allDogsId = await fetchDogsId(params);

      //fetches dog data off ids returned
      if (allDogsId.resultIds && allDogsId.resultIds.length > 0) {
        const dogData = await fetchDogsData(allDogsId.resultIds);
        setAllDogs(dogData);
      }
    } catch (error) {
      setOpenAlert(true);
      setError((error as Error).message);
    }
  };

  const fetchAllDogBreeds = async () => {
    try {
      const allBreeds = await fetchDogsBreed();

      setAllDogBreeds(allBreeds);
    } catch (error) {
      setOpenAlert(true);
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchAllDogs();
    fetchAllDogBreeds();
  }, [selectedBreeds]);

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <div style={{ width: "100%" }}>
        <BreedFilter
          breeds={allDogBreeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
          padding: "16px",
          alignItems: "start",
        }}
      >
        {allDogs.map((dog: Dog) => (
          <ImageListDog key={dog.id} dog={dog} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
        <Pagination count={10} color="primary" />
      </div>
      <AlertDisplaySnackbar
        message={error}
        open={openAlert}
        onClose={handleClose}
        severity="error"
      />
    </div>
  );
};

export default Home;
