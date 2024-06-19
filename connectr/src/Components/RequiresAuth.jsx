import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";

export const RequiresAuth = ({ children }) => {
  const { loginDetails } = useAuthContext();
  const location = useLocation();

  return loginDetails?.encodedToken ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
