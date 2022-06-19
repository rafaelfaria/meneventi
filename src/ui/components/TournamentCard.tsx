import { Typography, Card, Box, CardContent, CardMedia } from '@mui/material';
import { Tournament } from "../../lib/amplify/API";
import Chip from '../../assets/chip.png';
import { format } from 'date-fns'

type Props = {
  data: Partial<Tournament>;
}

export default function TournamentCard({ data }: Props) {
  const date = new Date(data.date || new Date())
  const day = format(date, 'dd');
  const month = format(date, 'MMM');

  return (
      <Card sx={{ display: 'flex' }}>
        <Box position="relative">
          <Box textAlign="center" sx={{
            color: '#000',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60px',
            height: '60px',
            transform: 'translate(-50%, -50%)',
            paddingTop: '7px'
          }}>
            <Typography variant="body1" sx={{ fontSize: '21px', lineHeight: 1 }}>{day}</Typography>
            <Typography variant="body1">{month}</Typography>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 100 }}
            image={Chip}
            alt={`${day} ${month}`}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 10 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {data.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {data.leaderboard?.filter((item:any) => item.prize && item.prize > 0).map((item: any) => `${(item.place === 1) ? '👑' : '🏆'} ${item.name}`).join(', ')}
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ width: '100px' }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="body1" sx={{ color: '#CCC' }}>Prize</Typography>
          <Typography variant="h5">$150</Typography>
        </Box>
      </Card>
  );
}


