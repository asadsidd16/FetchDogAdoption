import Button from "@mui/material/Button";
import { logout } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div>
      Home
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;
