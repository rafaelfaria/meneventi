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
  points: number;
  wins: number;
  totalPrize: number;
  totalInvestment: number;
  totalProfit: number;
  roi: number;
  places: number[];
}

const useLeaderboard = ({ list }: Props) => {

  const [ { users } ] = useUser();


  let leaderboard: any = {};
  console.log({ list })
  for (let tournament of list) {
    if (!tournament.leaderboard) continue;
    const numPlayers = tournament.leaderboard.length;
    for (let player of tournament.leaderboard) {

      const current = { ...(leaderboard[player?.username] || { wins: 0, played: 0, totalInvestment: 0, totalPrize: 0 }) };
      const totalInvestment = current.totalInvestment + (player?.buyIn || 0);
      const totalPrize = current.totalPrize + (player?.prize || 0);
      const netProfit = totalPrize - totalInvestment;
      const roi = (netProfit / totalInvestment) * 100;
      // const points = Number(((leaderboard[player?.username]?.points || 0) + (Math.sqrt(numPlayers+1) / player.place * 10)).toFixed(1).replace('.0',''));
      // const points = Number(((leaderboard[player?.username]?.points || 0) + (Math.log(numPlayers+1) / player.place * 10)).toFixed(1).replace('.0',''));
      const points = Number((leaderboard[player?.username]?.points || 0) + (player.place <10 ? [43,19,13,7,5,3,2,1][player.place-1] : 0));
      const places = [...(leaderboard[player?.username]?.places || []), player.place]

      leaderboard[player?.username] = {
        player,
        points,
        wins: current.wins + ((player?.place === 1) ? 1 : 0),
        played: current.played + 1,
        totalPrize,
        totalProfit: netProfit,
        totalInvestment,
        roi,
        places
      }
    }
  }

  leaderboard = Object.keys(leaderboard).map(key => leaderboard[key]) as Leaderboard[];
  leaderboard = orderBy(leaderboard, [/*'points', */'wins', 'roi', 'totalProfit', 'totalPrize', 'totalInvestment', 'played'], ['desc', 'desc',  'desc', 'desc', 'desc', 'desc']);

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

  leaderboard = leaderboard
                    .filter((item: any) => item.player.status === 'ACTIVE')
                    .map((item: any, index: number) => ({
                      ...item,
                      place: index + 1
                    }));
  console.log({ leaderboard })

  return [ leaderboard ];
};

export default useLeaderboard;