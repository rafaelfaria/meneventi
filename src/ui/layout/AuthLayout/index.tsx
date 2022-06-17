import { Outlet } from 'react-router-dom';

import FullwidthWrapper from '../../components/FullwidthWrapper';
import Logo from '../../../assets/logo-chip.png';
import { Box } from '@mui/material';

export default function AuthLayout() {
  return (
    <FullwidthWrapper>
      <Box sx={{ maxWidth: 700 }}>
        <img src={Logo} alt="Meneventi" width="100%"/>
      </Box>
      <Outlet />
    </FullwidthWrapper>
  );
}
