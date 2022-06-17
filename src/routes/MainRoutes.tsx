import { lazy } from 'react';

// project imports
import MainLayout from '../ui/layout/MainLayout';
import Loadable from '../ui/components/Loadable';

// pages
const Home = Loadable(lazy(() => import('../ui/pages/Home')));
const Tournament = Loadable(lazy(() => import('../ui/pages/Tournament')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/tournament/:id',
            element: <Tournament />
        }
    ]
};

export default MainRoutes;
