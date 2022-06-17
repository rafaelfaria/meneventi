import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import AccountPopover from './AccountPopover';
import Decoration from './Decoration';

const HeaderSimple = () => {
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
          },
          ]}
        >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }} />
          <Stack sx={{ flexGrow: 0 }} flexDirection="row" alignItems="center">
            <AccountPopover/>
          </Stack>
        </Toolbar>
      </AppBar>
      <Decoration />
    </Box>
  );
};
export default HeaderSimple;