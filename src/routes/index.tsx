import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// project imports
import MainLayout from '../ui/layout/MainLayout';
import AuthLayout from '../ui/layout/AuthLayout';
import Loadable from '../ui/components/Loadable';
import RequireAuth from './RequireAuth';

// login pages
import Login from '../ui/pages/auth/Login';
import Register from '../ui/pages/auth/Register';
import ResetPassword from '../ui/pages/auth/ResetPassword';
import Logout from '../ui/pages/auth/Logout';

// pages
const FourOFour = Loadable(lazy(() => import('../ui/pages/404')));
const Home = Loadable(lazy(() => import('../ui/pages/Home')));
const Teams = Loadable(lazy(() => import('../ui/pages/Teams')));
const TeamsForm = Loadable(lazy(() => import('../ui/pages/TeamsForm')));
const TournamentForm = Loadable(lazy(() => import('../ui/pages/TournamentForm')));

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
            { path: '/teams', element: <Teams /> },
            { path: '/teams/new', element: <TeamsForm /> },
            { path: '/teams/:team', element: <TeamsForm /> },
            { path: '/tournament/:tournament', element: <TournamentForm /> },
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
        { path: 'forgot-password', element: <ResetPassword /> },
        { path: 'logout', element: <Logout /> },
        { path: 'register', element: <Register /> },
      ]
    },
    { path: '*', element: <FourOFour /> }
  ]);
}
