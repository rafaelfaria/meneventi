import { Tournament } from '../lib/amplify/API';
import orderBy from 'lodash/orderBy';

type Props = {
  list: Tournament[];
}

export type Leaderboard = {
  place: number;
  player: string;
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
        player: player?.name,
        wins: current.wins + ((player?.place === 1) ? 1 : 0),
        played: current.played + 1,
        totalPrize: current.totalPrize + (player?.prize || 0),
        buyInTotal: current.buyInTotal + (player?.buyIn || 0),
      }
    }
  }

  leaderboard = Object.keys(leaderboard).map(key => leaderboard[key]) as Leaderboard[];
  leaderboard = orderBy(leaderboard, ['wins', 'played', 'totalPrize'], ['desc', 'desc', 'desc']);
  leaderboard = leaderboard.map((item: Leaderboard, index: number) => ({ ...item, place: index +  1 }));

  return [ leaderboard ];
};

export default useTournaments;