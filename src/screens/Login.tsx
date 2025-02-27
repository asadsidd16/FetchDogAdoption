import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AlertDisplaySnackbar from "../components/AlertDisplay";

import styled from "styled-components";

const HeaderText = styled.p`
  font-size: 28px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(name, email);
      navigate("/home");
    } catch (error) {
      setOpenAlert(true);
      setError((error as Error).message);
    } finally {
      setLoading(false);
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
      }}
    >
      <HeaderText>Fetch</HeaderText>
      <TextField
        required
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></TextField>
      <TextField
        required
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      <Button
        variant="contained"
        disabled={loading}
        loading={loading}
        onClick={handleSubmitLogin}
      >
        Sign In
      </Button>
      <AlertDisplaySnackbar
        message={error}
        open={openAlert}
        onClose={handleClose}
        severity="error"
      />
    </div>
  );
};

export default Login;
