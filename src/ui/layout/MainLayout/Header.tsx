import { IconButton, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import ColorMode from './ColorMode';
import AccountPopover from './AccountPopover';
import Decoration from './Decoration';

type Props = {
  toggleDrawer: () => void;
}

const Header = ({ toggleDrawer }: Props) => {
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
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              onClick={toggleDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

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