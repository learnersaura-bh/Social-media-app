import { Navigate, useLocation } from 'react-router-dom';

export const RequiresAuth = ({ children }) => {
  const location = useLocation();
  
  return localStorage?.getItem("token") ? (
    children
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};