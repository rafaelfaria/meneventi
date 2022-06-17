import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import ColorMode from './ColorMode';
import AccountPopover from './AccountPopover';
import Decoration from './Decoration';
import SiteTitle from './SiteTitle';

const Header = () => {
  const theme = useTheme();

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
            <ColorMode />
            <AccountPopover />
          </Stack>
        </Toolbar>
      </AppBar>
      <Decoration />
    </Box>
  );
};
export default Header;