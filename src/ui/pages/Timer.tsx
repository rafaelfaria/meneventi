import { useState } from "react";
import Page from "./Page";

import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import DataList from "../components/table/DataList";
import TimerData from "../components/table-columns/TimerData";
import AppConfig from "../../config";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useTimer } from "react-timer-hook";
import useSound from 'use-sound';

type TimerState = 'STOPPED' | 'RUNNING' | 'PAUSED';

const CONFIG = {
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


const getTimestamp = (minutes: number) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + minutes * 60)
  return time;
}

export default function Timer() {


  const [ timerState, setTimerState ] = useState<TimerState>('STOPPED');
  const [ round, setRound ] = useState(0);
  const [ isBreak, setIsBreak ] = useState(false);
  const currentRound = AppConfig.timer[round];
  const nextRound = AppConfig.timer[round+1];


  const [playBreak] = useSound('../../assets/break.mp3', { volume: 2.25 });
  const [playRoundChange] = useSound('../../assets/round-change.mp3', { volume: 2.25 });

  const {
      seconds,
      minutes,
      pause,
      resume,
      restart,
    } = useTimer({ autoStart: false, expiryTimestamp: getTimestamp(currentRound.duration), onExpire: () => moveToRound(round + 1, true) });

  const toggleTimerState = () => {
    switch (timerState) {
      case 'STOPPED':
        moveToRound(round);
        setTimerState('RUNNING');
        break;
      case 'RUNNING':
        pause();
        setTimerState('PAUSED');
        break;
      case 'PAUSED':
        resume();
        setTimerState('RUNNING');
        break;
    }
  }

  const moveToRound = (round: number, autoStart: boolean = true) => {
    setRound(round);
    const roundConfig = AppConfig.timer[round];
    setTimeout(() => {
      restart(getTimestamp(roundConfig.duration), autoStart);
    }, 500);
    setIsBreak(roundConfig?.break);

    if (roundConfig?.break) {
      playBreak();
    } else {
      playRoundChange();
    }
  }

  return (
    <Page>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Round>Round {round+1}</Round>
            </Grid>
            <GridFlex item xs={12} md={5}>
              <Clock>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</Clock>
            </GridFlex>
            <GridFlex item xs={12} md={2}>
              <Divider orientation="vertical"  />
            </GridFlex>
            <GridFlex item xs={12} md={5}>
              {isBreak ?
                <>
                  <Break variant="h5">BREAK</Break>
                  <NextBlinds>🍰 Cake Time 🍰</NextBlinds>
                </>
                :
                <>
                  <Blinds size={currentRound?.big?.toString().length}>{currentRound?.small}/{currentRound?.big}</Blinds>
                  <NextBlinds>Next: {nextRound?.break ? 'BREAK' : `${nextRound?.small}/${nextRound?.big}`}</NextBlinds>
                </>
              }
            </GridFlex>
            <GridFlex item xs={12}>
              <ButtonStart variant="contained" sx={{ width: '100%', mt: 5 }} startIcon={CONFIG[timerState].icon} onClick={toggleTimerState} timerState={timerState}>
                {CONFIG[timerState].label}
              </ButtonStart>

            </GridFlex>
          </Grid>

        </Grid>
        <Grid item xs={12}>
          <Box overflow="auto" maxHeight="400px">
            <DataList
              title="Leaderboard"
              columnData={TimerData}
              items={AppConfig.timer}
              hideCheckbox={true}
              hideToolbar={true}
              idProp="round"
              highlightItem={currentRound}
              columnDataParams={{ moveToRound }}
              onRowClick={(item) => moveToRound(item.round-1, timerState === 'RUNNING')}
            />
          </Box>
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

const Break = styled(Typography)(() => ({
  background: 'linear-gradient(to right, #fa486a 30%, #edca8c 70%)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  fontSize: 80
}));

type BlindsProps = {
  size: number;
}

const Blinds = styled(Typography)<BlindsProps>(({ theme, size }) => ({
  background: 'linear-gradient(to right, #fa7b48 30%, #f7c826 70%)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  color:'#ff8906',
  fontSize: size > 3 ? (size > 4 ? (size > 5 ? 60 : 75) : 90) : 120,
  [theme.breakpoints.up('lg')]: {
    fontSize: size > 4 ? (size > 5 ? 80 : 90) : 120,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 60,
  },
  fontWeight: 'bold'
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

