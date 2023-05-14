import { Avatar, Box, Card, CardContent, CardMedia, Fade, Stack, Table, TableCell, TableRow, Typography } from '@mui/material';
import { Tournament } from '../../lib/amplify/API';
import useStats from '../../hooks/useStats';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import DataList from './table/DataList';
import head2HeadData from './table-columns/Head2HeadData';
import useProfile from '../../hooks/useProfile';

type Props = {
  tournaments: Tournament[];
  username: string;
  openProfile: (title: string, username: string) => void
}

const Profile = ({ tournaments, username, openProfile }: Props) => {

  const meneventiStats = useStats();
  const [ profile, setProfile ] = useState<any>();
  const [ head2Head, setHead2Head ] = useState<any>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <Box>
      {(isLoading) &&
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <Loading type="bars" color="#d7e0e8" width={100} height={100} />
        </Box>
      }

      {(profile && !isLoading) &&
        <Box>
          <Stack flexDirection="row" columnGap={3}>
            <Box sx={{ width: 280, height: 280, borderRadius: 2, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#252d33' }}>
              {profile.user.photo ?
                <img
                  src={profile?.user.photo}
                  alt={profile?.user.name}
                  style={{ width: 280, height: 280, borderRadius: 10 }}
                />
              : <Typography variant="h3">{profile.user.initials}</Typography>
              }
            </Box>
            <Box flexBasis="100%">
              <Typography variant="h4">{profile?.user.name}</Typography>
              <Typography variant="body2">Playing Since: 22 Jun 2022</Typography>
              <br />
              <Table width="100%" size="small">
                <TableRow>
                  <TableCell>Played</TableCell>
                  <TableCell>{profile.played} tournaments</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Wins</TableCell>
                  <TableCell>{profile.wins} tournaments</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Final Table</TableCell>
                  <TableCell>{profile.totalFinals} tournaments</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Prize</TableCell>
                  <TableCell>${profile.totalPrize}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Biggest Pot Won</TableCell>
                  <TableCell>${profile.biggestPrize}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Biggest Rival</TableCell>
                  <TableCell>{profile.biggestRivals.map((player: any) => player.user.name).join(', ') || '-'}</TableCell>
                </TableRow>
              </Table>
            </Box>
          </Stack>
          {profile.totalFinals > 0 &&
            <Box>
              <Typography variant="h5" sx={{ my: 3 }}>Head to Head ({profile.totalFinals})</Typography>
              <DataList
                title="Head to Head"
                columnData={head2HeadData}
                columnDataParams={{ openProfile }}
                items={head2Head}
                hideCheckbox={true}
                hideToolbar={true}
                hideHeading={true}
              />

            </Box>
          }
        </Box>
      }

    </Box>
  )
}

export default Profile;