import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import notfound from "../assets/notfound.png";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h6" color="textSecondary" mb={3}>
        Oops! The page you're looking for does not exist.
      </Typography>
      <img src={notfound} alt="Not Found Page" width={300} height={350} />
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ marginTop: 3 }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
