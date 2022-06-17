import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppConfig from '../../../config';
import Header from './Header';
import Sidebar from './Sidebar';

type MainProps = {
  isDrawerOpen: boolean;
};

export default function MainLayout() {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const [isDrawerOpen, setDrawerOpen] = useState(matchUpMd);
  const [ drawerStateBeforeViewPortChange, setDrawerStateBeforeViewPortChange ] = useState(matchUpMd);

  useEffect(() => {
    if (!matchUpMd && isDrawerOpen) {
     setDrawerOpen(false)
    } else
        // This is more an edge case for changing view port from mobile to desktop
        // If you go from small, to medium+, then check if the previous state of the drawer
        // was opened, so we can re-open it
        if (matchUpMd && !isDrawerOpen && drawerStateBeforeViewPortChange) {
          setDrawerOpen(true);
        }

    setDrawerStateBeforeViewPortChange(isDrawerOpen);
  }, [matchUpMd]);

  return (
    <>
      <Main isDrawerOpen={isDrawerOpen}>
        <CssBaseline />
        <Header
          toggleDrawer={() => setDrawerOpen(prevState => !prevState)}
        />

        <Sidebar
          isDrawerOpen={isDrawerOpen}
          handleOnCloseDrawer={() => setDrawerOpen(false)}
          matchUpMd={matchUpMd} />

        <Box component="main" sx={{ p: 3, marginTop: '20px', position: "relative", width: "100%" }}>
          <Outlet />
        </Box>
      </Main>
    </>
  );
}


const Main = styled('div', { shouldForwardProp: prop => prop !== 'isDrawerOpen'})<MainProps>(({ theme, isDrawerOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create('padding', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(isDrawerOpen && {
    paddingLeft: `${AppConfig.menu.drawerWidth}px`
  }),
  ...(!isDrawerOpen && {
    paddingLeft:`${AppConfig.menu.drawerWidthSmall}px`
  }),
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
  },
}));
