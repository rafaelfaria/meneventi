import { Avatar, Stack, Typography } from '@mui/material';
import { Leaderboard } from '../../hooks/useLeaderboard';

const columnData = () => {
  return [
    {
      header: {
        id: 'place',
        label: '#',
        disablePadding: false,
        width: 10
      },
      render: (rowData:Leaderboard) => {
        return rowData.place === 1 ? '🥇' : rowData.place === 2 ? '🥈' : rowData.place === 3 ? '🥉' : ''
      },
    },
    {
      header: {
        id: 'name',
        label: 'Player',
        disablePadding: false
      },
      render: (rowData:Leaderboard) => {
        return (
          <Stack flexDirection="row">
            <Avatar src={rowData.player.photo as string} alt={rowData.player.name} sx={{ width: 25, height: 25, fontSize: 14, mr: 1 }}>{rowData.player.initials}</Avatar>
            <Typography>{rowData.player.name}</Typography>
          </Stack>
        )
      },
    },
    {
      header: {
        id: 'wins',
        label: 'Wins'
      },
      render: (rowData:Leaderboard) => {
        return rowData.wins;
      },
    },
    {
      header: {
        id: 'played',
        label: 'Played'
      },
      render: (rowData:Leaderboard) => {
        return rowData.played;
      },
    },
    {
      header: {
        id: 'roi',
        label: 'ROI %'
      },
      render: (rowData:Leaderboard) => {
        return `${rowData.roi.toFixed(2).replace('.00','')}%`;
      },
    },
    {
      header: {
        id: 'totalProfit',
        label: 'Profit'
      },
      render: (rowData:Leaderboard) => {
        return `$${rowData.totalProfit}`.replace('$-','-$');
      },
    },
    {
      header: {
        id: 'totalPrize',
        label: 'Total Prize'
      },
      render: (rowData:Leaderboard) => {
        return `$${rowData.totalPrize}`;
      },
    },
    {
      header: {
        id: 'totalInvestment',
        label: 'Total Buy In',
      },
      render: (rowData:Leaderboard) => {
        return `$${rowData.totalInvestment}`;
      },
    },
  ]
};

export default columnData;