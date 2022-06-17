import { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import useApp from "../../../hooks/useApp";
import useAuth from '../../../hooks/useAuth';

export default function Logout() {

  const { authRepository } = useApp();
  const { authUser, setAuthUser } = useAuth() ;

  useEffect(() => {
    (async () => {
      await authRepository?.logOut();
      setAuthUser();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (authUser ? null : <Navigate to="/login" />);
}