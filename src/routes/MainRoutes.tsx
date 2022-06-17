import { lazy } from 'react';

// project imports
import MainLayout from '../ui/layout/MainLayout';
import Loadable from '../ui/components/Loadable';

// pages
const Home = Loadable(lazy(() => import('../ui/pages/Home')));
const Events = Loadable(lazy(() => import('../ui/pages/Events')));
const Signals = Loadable(lazy(() => import('../ui/pages/Signals')));

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
            path: '/eventos',
            element: <Events />
        },
        {
            path: '/sinais',
            element: <Signals />
        }
    ]
};

export default MainRoutes;
