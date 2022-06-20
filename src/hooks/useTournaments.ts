import { Tournament, User } from '../lib/amplify/API';
import orderBy from 'lodash/orderBy';

type Props = {
  list: Tournament[];
}

export type Leaderboard = {
  place: number;
  player: User;
  played: number;
  wins: number;
  totalPrize: number;
  buyInTotal: number;
}

const useTournaments = ({ list }: Props) => {
  let leaderboard: any = {};
  for (let tournament of list) {
    if (!tournament.leaderboard) continue;
    for (let player of tournament.leaderboard) {
      const current = { ...(leaderboard[player?.username] || { wins: 0, played: 0, buyInTotal: 0, totalPrize: 0 }) };
      leaderboard[player?.username] = {
        player,
        wins: current.wins + ((player?.place === 1) ? 1 : 0),
        played: current.played + 1,
        totalPrize: current.totalPrize + (player?.prize || 0),
        buyInTotal: current.buyInTotal + (player?.buyIn || 0),
      }
    }
  }

  leaderboard = Object.keys(leaderboard).map(key => leaderboard[key]) as Leaderboard[];
  leaderboard = orderBy(leaderboard, ['wins', 'totalPrize', 'played'], ['desc', 'desc', 'desc']);

  leaderboard = leaderboard.reduce((acc: Leaderboard[], item: Leaderboard, index: number) => {

    let place = 1;
    const prev = acc[index > 0 ? index-1 : 0];

    if (index > 0) {
      if (prev.wins === item.wins) {
        place = prev.place;
      } else {
        place = prev.place + 1;
      }
    } else {
      place = index === 0 ? 1 : prev.place + 1;
    }
    acc[index].place = place;

    return acc;
  }, leaderboard);

  return [ leaderboard ];
};

export default useTournaments;