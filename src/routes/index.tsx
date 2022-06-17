import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// project imports
import MainLayout from '../ui/layout/MainLayout';
import AuthLayout from '../ui/layout/AuthLayout';
import Loadable from '../ui/components/Loadable';
import RequireAuth from './RequireAuth';

// login pages
import Login from '../ui/pages/auth/Login';
// import Register from '../ui/pages/auth/Register';
import ResetPassword from '../ui/pages/auth/ResetPassword';
import Logout from '../ui/pages/auth/Logout';

// pages
const FourOFour = Loadable(lazy(() => import('../ui/pages/404')));
const Home = Loadable(lazy(() => import('../ui/pages/Home')));
const Tournament = Loadable(lazy(() => import('../ui/pages/Tournament')));

// ==============================|| ROUTING RENDER ||============================== //
export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/',
          element: <MainLayout />,
          children: [
            { path: '/', element: <Home /> },
            { path: '/tournament/:tournament', element: <Tournament /> },
          ]
        }
      ]
    },
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: '/', element: <Navigate to="/" /> },
        { path: 'login', element: <Login /> },
        { path: 'esqueci-minha-senha', element: <ResetPassword /> },
        { path: 'deslogar', element: <Logout /> },
        // { path: 'cadastro', element: <Register /> },
      ]
    },
    { path: '*', element: <FourOFour /> }
  ]);
}
