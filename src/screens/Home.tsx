import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AlertDisplaySnackbar from "../components/AlertDisplay";
import ImageListDog from "../components/ImageList";
import BreedFilter from "../components/BreedFilter";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Pagination from "@mui/material/Pagination";
import MatchModal from "../components/MatchModal";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  fetchDogsId,
  fetchDogsData,
  fetchDogsBreed,
} from "../services/dogService";

import { Dog } from "../types/dog";
import { dogsMatch } from "../services/dogService";
import { useDog } from "../hooks/useDog";

const SIZE_OPTIONS = ["10", "25", "75", "100"];
const SORT_OPTIONS = [
  { label: "Breed (A-Z)", value: "breed:asc" },
  { label: "Breed (Z-A)", value: "breed:desc" },
  { label: "Name (A-Z)", value: "name:asc" },
  { label: "Name (Z-A)", value: "name:desc" },
  { label: "Age (Youngest First)", value: "age:asc" },
  { label: "Age (Oldest First)", value: "age:desc" },
];
const SKELETON_COUNT = 12;

const Home = () => {
  const { listOfDogsMatch, setMatchedDog, setListOfDogsMatch } = useDog();

  const [loading, setLoading] = useState<boolean>(false);
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationTriggered, setPaginationTriggered] = useState(false);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setPaginationTriggered(true);

    let newFrom = from; // Keep track of the new "from" value
    if (value > page && nextQuery) {
      // Moving to the next page
      newFrom = extractFromValueWithRegex(nextQuery);
    } else if (value < page && prevQuery) {
      // Moving to the previous page
      newFrom = extractFromValueWithRegex(prevQuery);
    }

    setFrom(newFrom); // Ensure `from` is updated immediately
    fetchAllDogs(newFrom); // Pass newFrom directly to avoid state delay
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
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

  const fetchAllDogs = async (customFrom = from) => {
    setLoading(true);
    try {
      const params = {
        breeds: selectedBreeds,
        size: size || "25",
        sort: sortOption || "breed:asc",
        from: customFrom,
      };

      const allDogsId = await fetchDogsId(params);

      if (allDogsId.resultIds && allDogsId.resultIds.length > 0) {
        const dogData = await fetchDogsData(allDogsId.resultIds);
        setAllDogs(dogData);
      }

      setNextQuery(allDogsId.next || "");
      setPrevQuery(allDogsId.prev || "");
      setTotalPages(Math.ceil(allDogsId.total / parseInt(size)));
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
    }
  };

  useEffect(() => {
    if (paginationTriggered) {
      setPaginationTriggered(false); // Reset the flag after manual call
      return;
    }

    if (selectedBreeds.length > 0 || sortOption || size) {
      setPage(1); // Reset page to 1 when filters change
      setFrom(null); // Reset pagination cursor
    }

    fetchAllDogs(null); // Fetch fresh data
    fetchAllDogBreeds();
  }, [selectedBreeds, sortOption, size, from]);

  return (
    <div>
      <Header />
      <BreedFilter
        breeds={allDogBreeds}
        selectedBreeds={selectedBreeds}
        setSelectedBreeds={setSelectedBreeds}
      />
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
            flexWrap: "wrap",
          }}
        >
          <Dropdown
            allOptions={SORT_OPTIONS}
            option={sortOption}
            setOption={setSortOption}
            label={"Select sort"}
          />
          <Dropdown
            allOptions={SIZE_OPTIONS}
            option={size}
            setOption={setSize}
            label={"Select size"}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textWrap: "nowrap",
              marginBottom: 10,
            }}
          >
            <Button
              onClick={handleMatch}
              variant="contained"
              sx={{ height: "40px" }}
              startIcon={<FavoriteIcon />}
            >
              Let's Match
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
          padding: "10px",
          alignItems: "start",
        }}
      >
        {loading
          ? [...Array(SKELETON_COUNT)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          : allDogs.map((dog: Dog) => <ImageListDog key={dog.id} dog={dog} />)}
      </div>

      <Stack spacing={2} direction="row" justifyContent="center" margin={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
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
