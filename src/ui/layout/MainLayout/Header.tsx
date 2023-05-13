import { IconButton, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import ColorMode from './ColorMode';
import AccountPopover from './AccountPopover';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SiteTitle from './SiteTitle';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate()

  return (
    <Box position="relative">
      <AppBar
          position="sticky"
          sx={[{
            transition: theme.transitions.create('padding', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            boxShadow: "-5px -3px 8px 0px #000000",
            pr: 2,
            [theme.breakpoints.down('md')]: {
              pl: 2,
            }
          },
          (theme) => ({
            'background': theme.palette.gradient[theme.palette.mode],
          })
          ]}
        >
        <Toolbar disableGutters>
          <SiteTitle />
          <Box sx={{ flexGrow: 1 }} />
          <Stack sx={{ flexGrow: 0 }} flexDirection="row" alignItems="center">
            <IconButton onClick={() => navigate('/timer')}><AlarmOnIcon /></IconButton>
            <IconButton onClick={() => navigate('/stats')}><QueryStatsIcon /></IconButton>
            {/* <ColorMode /> */}
            <AccountPopover />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;