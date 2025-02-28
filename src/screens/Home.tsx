import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AlertDisplaySnackbar from "../components/AlertDisplay";
import ImageListDog from "../components/ImageList";
import BreedFilter from "../components/BreedFilter";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Pagination from "@mui/material/Pagination";
import MatchModal from "../components/MatchModal";
import { useNavigate } from "react-router-dom";

import {
  fetchDogsId,
  fetchDogsData,
  fetchDogsBreed,
} from "../services/dogService";
import { logout } from "../services/authService";
import { Dog } from "../types/dog";
import { dogsMatch } from "../services/dogService";
import { useDog } from "../hooks/useDog";

const Home = () => {
  const navigate = useNavigate();
  const { listOfDogsMatch } = useDog();

  const [loading, setLoading] = useState<boolean>(false);
  const [matchLoading, setMatchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [allDogBreeds, setAllDogBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
    setLoading(true);
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
    } finally {
      setLoading(false);
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

  const handleMatch = async () => {
    setMatchLoading(true);
    try {
      const matchRes = await dogsMatch(listOfDogsMatch);
      if (matchRes && matchRes.match) {
        setOpenMatchModal(true);
      }
    } catch (error) {
      setOpenAlert(true);
      setError((error as Error).message);
    } finally {
      setMatchLoading(false);
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
        <Button onClick={handleMatch} variant="text">
          Ready to find your match?
        </Button>
      </div>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 15 }}
        >
          <LoadingSkeleton />
        </div>
      ) : (
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
      )}

      <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
        <Pagination count={10} color="primary" />
      </div>
      <MatchModal open={openMatchModal} setOpen={setOpenMatchModal} />
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
