import { Outlet } from 'react-router-dom';

import FullwidthWrapper from '../../components/FullwidthWrapper';
import Logo from '../../../assets/cryptoken-logo.png';
import { Box } from '@mui/material';

export default function AuthLayout() {
  return (
    <FullwidthWrapper>
      <Box sx={{ maxWidth: 700 }}>
          <img src={Logo} alt="Cryptoken" width="100%"/>
      </Box>
      <Outlet />
    </FullwidthWrapper>
  );
}
