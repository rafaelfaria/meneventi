import { Tournament } from '../lib/amplify/API';
import orderBy from 'lodash/orderBy';

export type StatsProps = {
  place: number;
  name: string;
  photo: string;
  initials: string;
  value: number;
}

const useStats = () => {
  const getStats = (list: Tournament[]) => {
    let players:any = {};
    let finalTable:any = {};

    for (let tournament of list) {
      const leaderboard = orderBy(tournament.leaderboard || [], ['place'], ['asc']); // make sure its ordered by place

      for (let i = 0; i < leaderboard.length; i++) {
        const player = leaderboard[i];
        if (!players[player.username]) {
            players[player.username] = {}
        }
        players[player.username].name = player?.name;
        players[player.username].photo = player?.photo;
        players[player.username].initials = player?.initials;
        players[player.username].p1 = (players[player.username]?.p1 || 0) + ((player.place === 1) ? 1 : 0);
        players[player.username].p2 = (players[player.username]?.p2 || 0) + ((player.place === 2) ? 1 : 0);
        players[player.username].p3 = (players[player.username]?.p3 || 0) + ((player.place === 3) ? 1 : 0);
        players[player.username].final = (players[player.username]?.final || 0) + ((player.place === 1 || player.place === 2) ? 1 : 0);
        players[player.username].buyIn = (players[player.username].buyIn || 0) + Math.round(player?.buyIn ? player.buyIn / 15 : 0);
        players[player.username].played = (players[player.username].played || 0) + 1;

        if (player.place === 1) {
          let finalPlayers = orderBy([player, leaderboard[i+1]], ['username'], ['asc']);
          const key = `${finalPlayers[0].username}-${finalPlayers[1].username}`;
          if (!finalTable[key]) finalTable[key] = { player1: finalPlayers[0], player2: finalPlayers[1], count: 0 };
          finalTable[key].count++;
        }
      }
    }
    finalTable = orderBy(Object.keys(finalTable).map(key => finalTable[key]), ['count'], ['desc']);
    finalTable = finalTable.map((item: any) => ({
      name: `${item.player1.name} vs ${item.player2.name}`,
      value: item.count,
    }));

    players = Object.keys(players).map(key => players[key]);
    const p1 = orderPlayers(players, 'p1');
    const p2 = orderPlayers(players, 'p2');
    const p3 = orderPlayers(players, 'p3');
    const final = orderPlayers(players, 'final');
    const buyIn = orderPlayers(players, 'buyIn');
    const played = orderPlayers(players, 'played');
    console.log({ p1, p2, p3, final, buyIn })

    return { p1, p2, p3, final, buyIn, played, finalTable };
  }

  return { getStats }
};

function orderPlayers(players: any, key: string) {
  return orderBy(players, [key, 'name'], ['desc', 'asc']).map((player, index) => ({ place: (index+1), photo: player.photo, name: player.name, value: player[key] })).splice(0, 5) as StatsProps[];
}

export default useStats;