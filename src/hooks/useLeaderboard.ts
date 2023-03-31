import { Tournament, User } from '../lib/amplify/API';
import orderBy from 'lodash/orderBy';
import useUser from './useUsers';

type Props = {
  list: Tournament[];
}

export type Leaderboard = {
  place: number;
  player: User;
  played: number;
  wins: number;
  totalPrize: number;
  totalInvestment: number;
  totalProfit: number;
  roi: number;
}

const useLeaderboard = ({ list }: Props) => {

  const [ { users } ] = useUser();


  let leaderboard: any = {};
  for (let tournament of list) {
    if (!tournament.leaderboard) continue;
    for (let player of tournament.leaderboard) {
      const current = { ...(leaderboard[player?.username] || { wins: 0, played: 0, totalInvestment: 0, totalPrize: 0 }) };
      const totalInvestment = current.totalInvestment + (player?.buyIn || 0);
      const totalPrize = current.totalPrize + (player?.prize || 0);
      const netProfit = totalPrize - totalInvestment;
      const roi = (netProfit / totalInvestment) * 100;

      leaderboard[player?.username] = {
        player,
        wins: current.wins + ((player?.place === 1) ? 1 : 0),
        played: current.played + 1,
        totalPrize,
        totalProfit: netProfit,
        totalInvestment,
        roi
      }
    }
  }

  leaderboard = Object.keys(leaderboard).map(key => leaderboard[key]) as Leaderboard[];
  leaderboard = orderBy(leaderboard, ['wins', 'roi', 'totalProfit', 'totalPrize', 'totalInvestment', 'played'], ['desc', 'desc',  'desc', 'desc', 'desc', 'desc']);

  leaderboard = leaderboard.reduce((acc: Leaderboard[], item: Leaderboard, index: number) => {

    let place = 1;
    const prev = acc[index > 0 ? index-1 : 0];

    if (index > 0) {
      if (prev.wins === item.wins && prev.roi === item.roi) {
        place = prev.place;
      } else {
        place = prev.place + 1;
      }
    } else {
      place = index === 0 ? 1 : prev.place + 1;
    }
    acc[index].place = place;
    acc[index].player = users.find(user => user.username === acc[index].player.username) || acc[index].player

    return acc;
  }, leaderboard);

  console.log({ leaderboard })

  return [ leaderboard ];
};

export default useLeaderboard;