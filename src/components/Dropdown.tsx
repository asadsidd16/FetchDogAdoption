import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Dropdown = ({
  option,
  setOption,
  allOptions,
  label,
}: {
  option: string;
  setOption: (value: string) => void;
  allOptions: string[] | { label: string; value: string }[];
  label: string;
}) => {
  return (
    <FormControl
      variant="outlined"
      style={{ minWidth: 150, marginRight: 10, marginBottom: 10 }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={option}
        onChange={(e) => {
          setOption(e.target.value);
        }}
        label={label}
      >
        {Array.isArray(allOptions) &&
          allOptions.map((item) =>
            typeof item === "string" ? (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ) : (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          )}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
