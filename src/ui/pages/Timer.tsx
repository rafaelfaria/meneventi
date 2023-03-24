import { useEffect, useState } from "react";
import Page from "./Page";

import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import DataList from "../components/table/DataList";
import TimerData from "../components/TimerData";
import AppConfig from "../../config";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useTimer } from "react-timer-hook";

type TimerState = 'STOPPED' | 'RUNNING' | 'PAUSED';

export default function Timer() {

  const moveNextRound = () => {
    console.log('NEXT ROUND');
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    restart(time, true);
  }

  const [ timerState, setTimerState ] = useState<TimerState>('STOPPED');
  const [ round, setRound ] = useState(0);

  const {
      seconds,
      minutes,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ autoStart: true, expiryTimestamp: new Date(), onExpire: moveNextRound });

  useEffect(() => {
    switch (timerState) {
      case 'RUNNING':
        resume();
        break;
      case 'PAUSED':
        pause();
      break;
    }


  }, [timerState])

  const config = {
    'STOPPED': {
      label: 'Start',
      icon: <PlayCircleFilledWhiteIcon />
    },
    'RUNNING': {
      label: 'Pause',
      icon: <PauseCircleIcon />
    },
    'PAUSED': {
      label: 'Resume',
      icon: <PlayCircleFilledWhiteIcon />
    },
  }

  const toggleTimerState = () => {
    switch (timerState) {
      case 'STOPPED':
        setTimerState('RUNNING');
        break;
      case 'RUNNING':
        setTimerState('PAUSED');
        break;
      case 'PAUSED':
        setTimerState('RUNNING');
        break;
    }
  }

  return (
    <Page>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Round>Round 1</Round>
            </Grid>
            <GridFlex item xs={12} md={5}>
              <Clock>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</Clock>
            </GridFlex>
            <GridFlex item xs={12} md={2}>
              <Divider orientation="vertical"  />
            </GridFlex>
            <GridFlex item xs={12} md={5}>
              <Blinds>100/200</Blinds>
              <NextBlinds>Next: 200/400</NextBlinds>
            </GridFlex>
            <GridFlex item xs={12}>
              <ButtonStart variant="contained" sx={{ width: '100%', mt: 5 }} startIcon={config[timerState].icon} onClick={toggleTimerState} timerState={timerState}>
                {config[timerState].label}
              </ButtonStart>

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
  background: 'linear-gradient(to right, #464da8 30%, #2675f7 70%)',
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

const NextBlinds = styled(Typography)(() => ({
  fontSize: 26,
  color: '#888686',
}));

type TimerStateProps = {
  timerState: TimerState;
}
const ButtonStart = styled(Button)<TimerStateProps>(({ timerState }) => ({
  background: (timerState === 'RUNNING') ? 'linear-gradient(to right, #bc5757 30%, #cd2f21 70%)' : 'linear-gradient(to right, #327b81 30%, #129963 70%)',
  color:'#FFF',
  fontSize: 20,
  fontWeight: 'bold',
  maxWidth: 200,
  margin: '0 auto',
}));

