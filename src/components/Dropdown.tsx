import { FormControl, InputLabel, Select, MenuItem, Menu } from "@mui/material";

const Dropdown = ({
  option,
  setOption,
  allOptions,
  label,
}: {
  option: string;
  setOption: (value: string) => void;
  allOptions: string[];
  label: string;
}) => {
  return (
    <FormControl variant="outlined" style={{ minWidth: 150, margin: 10 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={option}
        onChange={(e) => {
          setOption(e.target.value);
        }}
        label={label}
      >
        {allOptions.map((item: string) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
