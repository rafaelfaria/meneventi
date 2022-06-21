import Page from "./Page";

import { Container, Typography, Box, Stack, Button } from '@mui/material';
import FullWidthWrapper from '../components/FullwidthWrapper';

import './LandingPage.scss'
import useCountdown from "../../hooks/useCountdown";

import Logo from '../../assets/logo-chip.png';
import { Navigate } from "react-router-dom";
type Props = {
  endDate: number;
}

export default function Waiting({ endDate }: Props) {

  const  [days, hours, minutes, seconds] = useCountdown(endDate)

  const today = (new Date()).getTime();

  if (today > endDate) {
    return <Navigate to="/" replace />
  }

  return (
    <Page>
      <FullWidthWrapper>
        <Container sx={{ mt:10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <img src={Logo} width="200" />
          <Typography variant="h4">Meneventi</Typography>
          <br />
          <Typography variant="h6">A surprise will be revealed soon! 🃏</Typography>
        </Container>
        {}

        <Stack flexDirection="row" columnGap={2} sx={{ mt: 2 }}>
          <DateTimeDisplay value={days} type="Days" />
          <DateTimeDisplay value={hours} type="Hours" />
          <DateTimeDisplay value={minutes} type="Mins"/>
          <DateTimeDisplay value={seconds} type="Seconds" />
        </Stack>
      </FullWidthWrapper>
    </Page>
  );
}

type TimeDisplayProps = {
  value: number | string;
  type: string;
}

const DateTimeDisplay = ({ value, type }: TimeDisplayProps) => {
  return (
    <Box textAlign="center">
      <Typography variant="h3" sx={{ background: '#3a827d', p: 2, minWidth: { xs: 80, md: 120 }, borderRadius: 2, fontSize: { xs: 18, md: 30 } }}>{value}</Typography>
      <Typography>{type.toUpperCase()}</Typography>
    </Box>
  );
};