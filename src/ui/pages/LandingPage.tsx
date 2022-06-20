import Page from "./Page";
import Box from '@mui/material/Box';

import { Button, Container, Typography } from '@mui/material';
import FullWidthWrapper from '../components/FullwidthWrapper';

import './LandingPage.scss'
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <Page>
      <FullWidthWrapper>
        <Container sx={{ mt:10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Box className="coin"></Box>
          <Typography variant="h4">Meneventi</Typography>
        </Container>
        <Button onClick={() => navigate('/login')} sx={{ position: 'absolute', bottom: 0, right: 0, color: '#2e2e30' }}><Typography variant="h3">𝛑</Typography></Button>
      </FullWidthWrapper>
    </Page>
  );
}