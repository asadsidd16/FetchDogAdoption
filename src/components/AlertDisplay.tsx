import React, { ReactNode } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

interface SnackbarProps {
  message: ReactNode;
  open: boolean;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  severity?: "error" | "warning" | "info" | "success";
}

const AlertDisplaySnackbar: React.FC<SnackbarProps> = ({
  message,
  open,
  onClose,
  severity = "error",
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <MuiAlert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertDisplaySnackbar;
