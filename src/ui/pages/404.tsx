import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import './404.scss';

export default function FourOFour() {

  const ghostEyes = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const pageX = document.body.offsetWidth;
    const pageY = document.body.offsetHeight;

    function handleMouseMove(e: any) {
      if (!ghostEyes.current) return;

      //verticalAxis
      const mouseY = e.pageY;
      const yAxis = (pageY/2-mouseY)/pageY*300;
      //horizontalAxis
      const mouseX = e.pageX / -pageX;
      const xAxis = -mouseX * 100 - 100;
      ghostEyes.current.style.transform = 'translate('+ xAxis +'%,-'+ yAxis +'%)';
    }

    document.addEventListener('mousemove', handleMouseMove);

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);


  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ position: 'relative', height: 300 }}>
            <div className="box__ghost">
              <div className="symbol"></div>
              <div className="symbol"></div>
              <div className="symbol"></div>
              <div className="symbol"></div>
              <div className="symbol"></div>
              <div className="symbol"></div>

              <div className="box__ghost-container">
                <div className="box__ghost-eyes" ref={ghostEyes}>
                  <div className="box__eye-left"></div>
                  <div className="box__eye-right"></div>
                </div>
                <div className="box__ghost-bottom">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="box__ghost-shadow"></div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>Whoops</Typography>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>It seems like we coudn't find the page you were looking for</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', mt: 5 }} justifyContent="center">
            <Button href="/" variant="contained">Go back home</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}