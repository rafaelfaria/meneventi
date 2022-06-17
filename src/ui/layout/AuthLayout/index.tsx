import { Outlet } from 'react-router-dom';

import FullwidthWrapper from '../../components/FullwidthWrapper';
import { Box } from '@mui/material';
import SiteTitle from '../MainLayout/SiteTitle';

export default function AuthLayout() {
  return (
    <FullwidthWrapper>
      <Box sx={{ maxWidth: 700 }}>
        <SiteTitle />
      </Box>
      <Outlet />
    </FullwidthWrapper>
  );
}
