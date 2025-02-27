import { Routes, Route } from "react-router-dom";
import Login from "../screens/Login";
import Home from "../screens/Home";
import PrivateRoute from "../components/PrivateRoute";
import NotFound from "../screens/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />}></Route>

      {/* Protected Route */}
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
    </Routes>
  );
};

export default AppRoutes;
