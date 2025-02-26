import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styled from "styled-components";

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
`;

const HeaderText = styled.p`
  font-size: 18px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
`;

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(name, email);
      navigate("/home");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
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
        variant="filled"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></TextField>
      <TextField
        required
        label="Email"
        variant="filled"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      {error && <ErrorText>{error}</ErrorText>}
      <Button
        variant="contained"
        disabled={loading}
        loading={loading}
        onClick={handleSubmitLogin}
      >
        Sign In
      </Button>
    </div>
  );
};

export default Login;
