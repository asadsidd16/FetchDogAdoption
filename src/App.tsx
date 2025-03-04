import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DogProvider } from "./context/DogContext";
import AppRoutes from "./routes/AppRoutes";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <DogProvider>
          <Router>
            <AppRoutes />
          </Router>
        </DogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
