import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import ActionsButton from '../../components/ActionsButton';
import useAuth from '../../../hooks/useAuth';

export default function MainLayout() {
  const { authUser } = useAuth();

  return (
    <>
      <Main>
        <CssBaseline />
        <Header />
        <Box component="main" sx={{ p: 3, marginTop: '20px', position: "relative", width: "100%" }}>
          <Outlet />
          {authUser?.isAdmin ? <ActionsButton /> : null }
        </Box>
      </Main>
    </>
  );
}


const Main = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create('padding', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
  },
}));
