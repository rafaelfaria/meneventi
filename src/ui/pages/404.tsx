import { Box, Button, Container, Grid, Typography } from '@mui/material';
import FourOFourHero from '../../assets/404.png';

export default function FourOFour() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Grid container>
        <Grid item xs={12}>
          <img src={FourOFourHero} alt="404" width="100%"/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>Página não encontrada</Typography>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>404</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', mt: 5 }} justifyContent="center">
            <Button href="/" variant="contained">Ir para página principal</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}