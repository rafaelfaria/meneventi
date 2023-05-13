import { Avatar, Box, Card, CardContent, CardMedia, Fade, Stack, Typography } from '@mui/material';
import { Tournament } from '../../lib/amplify/API';
import useStats from '../../hooks/useStats';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import DataList from './table/DataList';
import head2HeadData from './table-columns/Head2HeadData';

type Props = {
  tournaments: Tournament[];
  username: string;
}

const Profile = ({ tournaments, username }: Props) => {

  const meneventiStats = useStats();
  const [ profile, setProfile ] = useState<any>();
  const [ head2Head, setHead2Head ] = useState<any>([]);

  useEffect(() => {
    (async () => {

      const result = await meneventiStats.getProfile(tournaments, username);
      setProfile(result);

      const h2h = result.head2Head.map((player:any) => {
        return {
          player1: result.user,
          player2: player.user,
          player1Wins: player.loss,
          player2Wins: player.wins,
          totalPrizeOpponent: player.totalPrizeOpponent,
          totalPrizeUser: player.totalPrizeUser
        }
      });
      setHead2Head(h2h);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <Box>
      {!profile &&
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <Loading type="bars" color="#d7e0e8" width={100} height={100} />
        </Box>
      }

      {profile &&
        <Box>
          <Stack flexDirection="row">
            <Box sx={{ width: 180, height: 180, borderRadius: 2, mr: 3, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#252d33' }}>
              {profile.user.photo ?
                <img
                  src={profile?.user.photo}
                  alt={profile?.user.name}
                  style={{ width: 180, height: 180, borderRadius: 10 }}
                />
              : <Typography variant="h3">{profile.user.initials}</Typography>
              }
            </Box>
            <Box>
              <Typography variant="h4">{profile?.user.name}</Typography>
              <Typography variant="body2">Playing Since: 22 Jun 2022</Typography>
              <br />
              <Typography variant="body1">Played: {profile.played}</Typography>
              <Typography variant="body1">Wins: {profile.wins}</Typography>
            </Box>
          </Stack>
          <Box>
            <Typography variant="h5" sx={{ my: 3 }}>Head to Head</Typography>
            <DataList
              title="Head to Head"
              columnData={head2HeadData}
              items={head2Head}
              hideCheckbox={true}
              hideToolbar={true}
              hideHeading={true}
            />

          </Box>
        </Box>
      }

    </Box>
  )
}

export default Profile;