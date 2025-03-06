import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AlertDisplaySnackbar from "../components/AlertDisplay";
import ImageListDog from "../components/ImageList";
import BreedFilter from "../components/BreedFilter";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Pagination from "@mui/material/Pagination";
import MatchModal from "../components/MatchModal";
import SortDropdown from "../components/SortDropdown";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";

import {
  fetchDogsId,
  fetchDogsData,
  fetchDogsBreed,
} from "../services/dogService";

import { Dog } from "../types/dog";
import { dogsMatch } from "../services/dogService";
import { useDog } from "../hooks/useDog";

const SIZE_OPTIONS = ["10", "25", "75", "100"];

const Home = () => {
  const { listOfDogsMatch, setMatchedDog, setListOfDogsMatch } = useDog();

  const [loading, setLoading] = useState<boolean>(false);
  const [matchLoading, setMatchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [allDogBreeds, setAllDogBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [size, setSize] = useState<string>("25");
  const [from, setFrom] = useState<string | null>("");
  const [sortOption, setSortOption] = useState<string>("breed:asc");
  const [nextQuery, setNextQuery] = useState("");
  const [prevQuery, setPrevQuery] = useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const extractFromValueWithRegex = (nextUrl: string): string | null => {
    const match = nextUrl.match(/from=(\d+)/);
    return match ? match[1] : null;
  };

  const fetchAllDogs = async () => {
    setLoading(true);
    try {
      const params = {
        breeds: selectedBreeds,
        size: size || "25",
        sort: sortOption || "breed:asc",
        from: from,
      };
      // Fetch dog data from API and return as an array of Dog objects
      const allDogsId = await fetchDogsId(params);

      //fetches dog data off ids returned
      if (allDogsId.resultIds && allDogsId.resultIds.length > 0) {
        const dogData = await fetchDogsData(allDogsId.resultIds);
        setAllDogs(dogData);
      }
      // Update next and prev queries for pagination
      setNextQuery(allDogsId.next || "");
      setPrevQuery(allDogsId.prev || "");
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
      if (listOfDogsMatch.length <= 0) {
        setOpenAlert(true);
        setError("No dogs have been selected for matching");
        return;
      }
      const matchRes = await dogsMatch(listOfDogsMatch);
      if (matchRes && matchRes.match) {
        let arrayForDog = [];
        arrayForDog.push(matchRes.match);
        const dogData = await fetchDogsData(arrayForDog);

        setMatchedDog(dogData);
        setListOfDogsMatch([]);
        setOpenMatchModal(true);
      }
    } catch (error) {
      setOpenAlert(true);
      setError((error as Error).message);
    } finally {
      setMatchLoading(false);
    }
  };

  const handleNextPage = () => {
    if (nextQuery) {
      let from = extractFromValueWithRegex(nextQuery);

      setFrom(from);
      fetchAllDogs();
    }
  };

  // const handlePrevPage = () => {
  //   if (prevQuery) {
  //     fetchAllDogs(prevQuery);
  //   }
  // };

  useEffect(() => {
    fetchAllDogs();
    fetchAllDogBreeds();
  }, [selectedBreeds, sortOption]);

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap", // Allows wrapping if needed
          }}
        >
          <BreedFilter
            breeds={allDogBreeds}
            selectedBreeds={selectedBreeds}
            setSelectedBreeds={setSelectedBreeds}
          />
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
          <Dropdown
            allOptions={SIZE_OPTIONS}
            option={size}
            setOption={setSize}
            label={"Select size"}
          />
        </div>

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
            padding: "10px",
            alignItems: "start",
          }}
        >
          {allDogs.map((dog: Dog) => (
            <ImageListDog key={dog.id} dog={dog} />
          ))}
        </div>
      )}

      {/* <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
        <Pagination count={10} color="primary" onClick={handleNextPage} />
      </div> */}
      <Button onClick={handleNextPage} variant="contained">
        Next
      </Button>
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
