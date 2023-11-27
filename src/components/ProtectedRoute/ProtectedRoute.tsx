import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@context/AuthContext";

interface ProtectedRouteProps {
  redirectUrl?: string;
}

function ProtectedRoute({ redirectUrl = "/login" }: ProtectedRouteProps) {
  const { user, isAuthenticating } = useAuthContext();

  if (isAuthenticating) {
    return <h1>Loading...</h1>;
  }

  return user === null ? <Navigate to={redirectUrl} /> : <Outlet />;
}

export default ProtectedRoute;
