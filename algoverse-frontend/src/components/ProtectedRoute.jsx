import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If not logged in → redirect
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If logged in → allow access
  return children;
}