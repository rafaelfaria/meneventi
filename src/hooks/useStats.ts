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

    for (let tournament of list) {
      const leaderboard = tournament.leaderboard || [];

      for (let player of leaderboard) {
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
      }
    }

    players = Object.keys(players).map(key => players[key]);
    const p1 = orderPlayers(players, 'p1');
    const p2 = orderPlayers(players, 'p2');
    const p3 = orderPlayers(players, 'p3');
    const final = orderPlayers(players, 'final');
    const buyIn = orderPlayers(players, 'buyIn');
    const played = orderPlayers(players, 'played');
    console.log({ p1, p2, p3, final, buyIn })

    return { p1, p2, p3, final, buyIn, played };
  }

  return { getStats }
};

function orderPlayers(players: any, key: string) {
  return orderBy(players, [key, 'name'], ['desc', 'asc']).map((player, index) => ({ place: (index+1), photo: player.photo, name: player.name, value: player[key] })).splice(0, 5) as StatsProps[];
}

export default useStats;