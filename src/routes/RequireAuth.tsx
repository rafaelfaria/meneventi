import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthLoading from "../ui/components/auth/AuthLoading";

type Props = {
  needAdminAccess?: boolean
}

export default function RequireAuth({ needAdminAccess }: Props) {
  const { authUser, isChecking } = useAuth();
  const location = useLocation();

  if (!authUser && isChecking === false) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authUser && needAdminAccess && !authUser?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (authUser) {
    return <Outlet />;
  }

  if (!authUser && isChecking) {
    return <AuthLoading />;
  }

  return null;
}