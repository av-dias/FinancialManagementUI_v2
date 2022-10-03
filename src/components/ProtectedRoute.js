import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (
    window.sessionStorage.getItem("user_id") &&
    window.sessionStorage.getItem("user_name") &&
    window.sessionStorage.length === 4
  ) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}
