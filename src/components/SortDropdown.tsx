import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortDropdown = ({
  sortOption,
  setSortOption,
}: {
  sortOption: string;
  setSortOption: (value: string) => void;
}) => {
  return (
    <FormControl variant="outlined" style={{ minWidth: 150, marginBottom: 20 }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortOption}
        onChange={(e) => {
          setSortOption(e.target.value);
        }}
      >
        <MenuItem value="breed:asc">Breed (A-Z)</MenuItem>
        <MenuItem value="breed:desc">Breed (Z-A)</MenuItem>
        <MenuItem value="name:asc">Name (A-Z)</MenuItem>
        <MenuItem value="name:desc">Name (Z-A)</MenuItem>
        <MenuItem value="age:asc">Age (Youngest First)</MenuItem>
        <MenuItem value="age:desc">Age (Oldest First)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
