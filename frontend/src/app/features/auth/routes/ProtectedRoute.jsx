// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuthenticated");

  return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;