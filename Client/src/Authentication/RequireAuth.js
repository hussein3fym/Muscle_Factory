import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./../Hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Check if the user has one of the allowed roles
  const hasAllowedRole = auth?.roles?.some((role) =>
    allowedRoles?.includes(role)
  );

  // Determine the appropriate redirection based on the user's role
  const getRedirection = () => {
    if (hasAllowedRole) {
      // User has an allowed role, render the child components
      switch (auth.roles[0]) {
        case "User":
          return <Navigate to="/" state={{ from: location }} replace />;
        case "Trainer":
          return (
            <Navigate to="/trainerPanel" state={{ from: location }} replace />
          );
        case "Admin":
          return (
            <Navigate to="/dashboard" state={{ from: location }} replace />
          );
        default:
          return <Outlet />;
      }
    } else if (auth?.user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  };

  return getRedirection();
};

export default RequireAuth;
