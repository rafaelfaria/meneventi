import { Avatar, Box, Stack, Typography } from '@mui/material';

const columnData = () => {
  return [
    {
      header: {
        id: 'name',
        label: 'Player 1'
      },
      render: (rowData:any) => {
        return (
          <Stack flexDirection="row">
            {rowData.player1.hasOwnProperty('photo') ?
              (<Avatar src={rowData.player1.photo as string} alt={rowData.player1.name} sx={{ width: 25, height: 25, fontSize: 14, mr: 1 }}>{rowData.player1.initials}</Avatar>)
            : null }
            <Typography>{rowData.player1.name}</Typography>
          </Stack>
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
        id: 'name',
        label: 'Player 2'
      },
      render: (rowData:any) => {
        return (
          <Stack flexDirection="row">
            {rowData.player2.hasOwnProperty('photo') ?
              (<Avatar src={rowData.player2.photo as string} alt={rowData.player2.name} sx={{ width: 25, height: 25, fontSize: 14, mr: 1 }}>{rowData.player2.initials}</Avatar>)
            : null }
            <Typography>{rowData.player2.name}</Typography>
          </Stack>
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