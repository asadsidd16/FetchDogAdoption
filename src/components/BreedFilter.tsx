import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const BreedFilter = ({ breeds, selectedBreeds, setSelectedBreeds }: any) => {
  return (
    <Autocomplete
      multiple
      options={breeds} // List of breed names (array of strings)
      value={selectedBreeds} // Currently selected breeds (should be an array)
      onChange={(event, newValue) => {
        setSelectedBreeds(newValue); // Update selected breeds
      }}
      renderInput={(params) => (
        <TextField {...params} label="Filter by Breed" />
      )}
    />
  );
};

export default BreedFilter;
