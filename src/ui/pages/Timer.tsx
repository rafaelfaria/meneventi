import Page from "./Page";

import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import DataList from "../components/table/DataList";
import TimerData from "../components/TimerData";
import AppConfig from "../../config";


export default function Timer() {

  return (
    <Page>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Round>Round 1</Round>
            </Grid>
            <GridFlex item xs={12} md={5}>
              <Clock>15:00</Clock>
            </GridFlex>
            <GridFlex item xs={12} md={2}>
              <Divider orientation="vertical"  />
            </GridFlex>
            <GridFlex item xs={12} md={5}>
              <Blinds>100/200</Blinds>
              <NextBlinds>Next: 200/400</NextBlinds>
            </GridFlex>
            <GridFlex item xs={12}>
              <ButtonStart variant="contained" sx={{ width: '100%', mt: 5 }}>Start</ButtonStart>
            </GridFlex>
          </Grid>

        </Grid>
        <Grid item xs={12}>
          <DataList title="Leaderboard" columnData={TimerData} items={AppConfig.timer} hideCheckbox={true} hideToolbar={true} />
        </Grid>

      </Grid>
    </Page>
  );
}

/*********************************************************************************
 * Styles
 ********************************************************************************/
const GridFlex = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const Round = styled(Paper)(() => ({
  textAlign: 'center',
  fontSize: '20px',
  padding: 10,
  background: '#3b4275',
}));

const Clock = styled(Typography)(({ theme }) => ({
  fontSize: 180,
  [theme.breakpoints.down('md')]: {
    fontSize: 100,
  }
}));

const Blinds = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(to right, #fa7b48 30%, #f7c826 70%)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  color:'#ff8906',
  fontSize: 130,
  [theme.breakpoints.down('md')]: {
    fontSize: 70,
  }
}));

const NextBlinds = styled(Typography)(({ theme }) => ({
  fontSize: 26,
  color: '#888686',
}));

const ButtonStart = styled(Button)(() => ({
  background: 'linear-gradient(to right, #464da8 30%, #2675f7 70%)',
  color:'#FFF',
  fontSize: 20,
  fontWeight: 'bold',
  maxWidth: 200,
  margin: '0 auto',
}));

