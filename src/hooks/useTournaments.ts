import { Tournament } from '../lib/amplify/API';

type Props = {
  list: Tournament;
}

export type Leaderboard = {
  player: any;
  playedTournaments: number;
  wins: number;
  prizeTotal: number;
  buyInTotal: number;
}

const useTournaments = ({ list }: Props) => {


};

export default useTournaments;