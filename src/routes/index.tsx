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

// admin
const AdminUsers = Loadable(lazy(() => import('../ui/pages/admin/AdminUsers')));
const AdminUserForm = Loadable(lazy(() => import('../ui/pages/admin/AdminUserForm')));

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
            { path: '/teams/:teamId', element: <TeamsForm /> },
            { path: '/tournament/:tournamentId', element: <TournamentForm /> },
          ]
        }
      ]
    },
    {
      path: '/admin',
      element: <RequireAuth needAdminAccess={true} />,
      children: [
        {
          path: '/admin',
          element: <MainLayout />,
          children: [
            { path: 'users', element: <AdminUsers /> },
            { path: 'users/new', element: <AdminUserForm /> },
            { path: 'users/:id', element: <AdminUserForm /> },
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
