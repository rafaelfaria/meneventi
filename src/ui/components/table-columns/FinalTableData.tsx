import { Avatar, Box, Stack, Typography } from '@mui/material';
import { ColumnParams } from '../table/DataList';
import { ProfileProviderInterface } from '../../../context/ProfileProvider';
import { styled } from '@mui/material/styles';

const columnData = (params: ColumnParams & ProfileProviderInterface) => {

  const { openProfile } = params || {};

  return [
    {
      header: {
        id: 'player1Name',
        label: 'Player 1'
      },
      render: (rowData:any) => {
        return (
          <ProfileWrapper onClick={() => openProfile(rowData.player1.name, rowData.player1.username)}>
            <Stack flexDirection="row">
              {rowData.player1.hasOwnProperty('photo') ?
                (<Avatar src={rowData.player1.photo as string} alt={rowData.player1.name} sx={{ width: 25, height: 25, fontSize: 14, mr: 1 }}>{rowData.player1.initials}</Avatar>)
              : null }
              <Typography>{rowData.player1.name}</Typography>
            </Stack>
          </ProfileWrapper>
        )
      },
    },
    {
      header: {
        id: 'player1Wins',
        label: 'Wins',
        align: 'center'
      },
      render: (rowData:any) => {
        return <Box textAlign="center">{rowData.player1Wins}</Box>;
      },
    },
    {
      header: {
        id: 'player2Name',
        label: 'Player 2'
      },
      render: (rowData:any) => {
        return (
          <ProfileWrapper onClick={() => openProfile(rowData.player2.name, rowData.player2.username)}>
            <Stack flexDirection="row">
              {rowData.player2.hasOwnProperty('photo') ?
                (<Avatar src={rowData.player2.photo as string} alt={rowData.player2.name} sx={{ width: 25, height: 25, fontSize: 14, mr: 1 }}>{rowData.player2.initials}</Avatar>)
              : null }
              <Typography>{rowData.player2.name}</Typography>
            </Stack>
          </ProfileWrapper>
        )
      },
    },
    {
      header: {
        id: 'player2Wins',
        label: 'Wins',
        align: 'center'
      },
      render: (rowData:any) => {
        return <Box textAlign="center">{rowData.player2Wins}</Box>;
      },
    },
    {
      header: {
        id: 'total',
        label: 'Total',
        align: 'center'
      },
      render: (rowData:any) => {
        return <Box textAlign="center">{rowData.total}</Box>
      },
    }
  ]
};

export default columnData;

const ProfileWrapper = styled(Box)(() => ({
  cursor: 'pointer'
}));