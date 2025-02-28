import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DogProvider } from "./context/DogContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <DogProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DogProvider>
    </AuthProvider>
  );
}

export default App;
