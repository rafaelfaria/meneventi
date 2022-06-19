import { Leaderboard } from '../../hooks/useTournaments';

const columnData = () => {
  return [
    {
      header: {
        id: 'name',
        label: 'Player',
        disablePadding: false
      },
      render: (rowData:Leaderboard) => {
        return rowData.player;
      },
    },
    {
      header: {
        id: 'playedTournaments',
        label: 'Tournaments'
      },
      render: (rowData:Leaderboard) => {
        return rowData.playedTournaments;
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
        id: 'prizeTotal',
        label: 'Total Prizes'
      },
      render: (rowData:Leaderboard) => {
        return rowData.prizeTotal;
      },
    }
  ]
};

export default columnData;