import { useRoutes } from 'react-router-dom';
import FourOFour from '../ui/pages/404';

// routes
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //


export default function ThemeRoutes() {
  const NoMatch = { path: '*', element: <FourOFour /> };
  return useRoutes([MainRoutes, NoMatch]);
}
