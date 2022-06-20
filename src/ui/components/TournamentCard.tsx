import { Typography, Card, Box, CardContent, CardMedia, IconButton, Modal, Paper, Grid, Stack, Avatar } from '@mui/material';
import { Tournament } from "../../lib/amplify/API";
import Chip from '../../assets/chip.png';
import { format } from 'date-fns'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import useAuth from '../../hooks/useAuth';

type Props = {
  data: Partial<Tournament>;
}

export default function TournamentCard({ data }: Props) {

  const { authUser } = useAuth();
  const navigate = useNavigate();

  const date = new Date(data.date || new Date())
  const day = format(date, 'dd');
  const month = format(date, 'MMM');

  const [ openTournamentModal, setOpenTournamentModal ] = useState<boolean>(false);

  return (
    <>
      <Card sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }} onClick={() => setOpenTournamentModal(true)}>
        <Box position="relative" sx={{ pl: 1 }}>
          <Box textAlign="center" sx={{
            color: '#000',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80px',
            height: '80px',
            transform: 'translate(-50%, -50%)',
            paddingTop: '20px',
            paddingLeft: '8px'
          }}>
            <Typography variant="body1" sx={{ fontSize: '20px', lineHeight: 1 }}>{day}</Typography>
            <Typography variant="body1">{month}</Typography>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 80 }}
            image={Chip}
            alt={`${day} ${month}`}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 10 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5" sx={{ fontSize: 20 }}>
              {data.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {data.leaderboard?.filter((item:any) => item.prize && item.prize > 0).map((item: any) => `${(item.place === 1) ? '👑' : '🏆'} ${item.name}`).join(', ')}
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ width: '100px', display: { xs: 'none', md: 'flex' } }} flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="body1" sx={{ color: '#CCC' }}>Total Prize</Typography>
          <Typography variant="h6">${data.totalPrize}</Typography>
        </Box>
        {authUser?.isAdmin ?
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <IconButton onClick={(e) => { e.stopPropagation(); navigate(`/tournament/${data.id}`); }}><MoreVertIcon /></IconButton>
          </Box>
          : null
        }
      </Card>
      <Modal open={openTournamentModal} onClose={() => setOpenTournamentModal(false)}>
        <FloatBox sx={{ p: 1 }}>
          <Grid container sx={{ p: 3 }}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontSize: 20 }}>
                {data.name}
              </Typography>
            </Grid>
            {data.leaderboard?.map((player) => {
              return (
                <Grid item xs={12}>
                  <Box sx={{ mb: 1, p: 2 }} component={Paper}>
                    <Stack flexDirection="row" columnGap={1} alignItems="center">
                      <Typography variant="h6" sx={{ fontSize: 30 }}>{player.place === 1 ? '🥇' : (player.place === 2 && (player.prize || 0) > 0) ? '🥈' : ''}</Typography>
                      <Avatar src={player.photo as string} alt={player.name} sx={{ width: 30, height: 30, fontSize: 20, mr: 1 }}>{player.initials}</Avatar>
                      <Stack flexDirection="column" columnGap={1}>
                        <Typography>{player.name}</Typography>
                        <Stack flexDirection="row" columnGap={1}>
                           {(player.prize && (player.prize > 0)) ? <Typography><strong>Prize:</strong> ${player.prize}</Typography> : null}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              );
            })}

          </Grid>
        </FloatBox>
      </Modal>
    </>
  );
}


const FloatBox = styled(Paper)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  maxWidth: '90%',
  padding: '15px',
  maxHeight: '480px',
  overflowY: 'auto'
}));

