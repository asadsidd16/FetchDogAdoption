import { Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        background: "#000",
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#FFF",
          fontWeight: 600,
        }}
      >
        Fetch
      </div>
      {isAuthenticated && (
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ height: "40px" }}
        >
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default Header;
