import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const BreedFilter = ({ breeds, selectedBreeds, setSelectedBreeds }: any) => {
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
    />
  );
};

export default BreedFilter;
