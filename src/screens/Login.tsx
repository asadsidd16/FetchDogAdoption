import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
    <div>
      <h2>Login</h2>
      <div>
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          variant="contained"
          disabled={loading}
          loading={loading}
          onClick={handleSubmitLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
