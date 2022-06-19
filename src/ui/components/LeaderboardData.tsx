import { Leaderboard } from '../../hooks/useTournaments';

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
        return rowData.player;
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
        id: 'totalPrize',
        label: 'Total $'
      },
      render: (rowData:Leaderboard) => {
        return rowData.totalPrize;
      },
    }
  ]
};

export default columnData;