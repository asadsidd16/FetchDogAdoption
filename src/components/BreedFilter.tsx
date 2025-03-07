import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface BreedFilterProps {
  breeds: string[]; // Array of available breed options
  selectedBreeds: string[]; // Array of currently selected breeds
  setSelectedBreeds: (breeds: string[]) => void; // Function to update selected breeds
}

const BreedFilter = ({
  breeds,
  selectedBreeds,
  setSelectedBreeds,
}: BreedFilterProps) => {
  return (
    <Autocomplete
      multiple
      options={breeds}
      value={selectedBreeds}
      onChange={(event, newValue) => {
        setSelectedBreeds(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Filter by Breed" />
      )}
      style={{ margin: 10 }}
    />
  );
};

export default BreedFilter;
