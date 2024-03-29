import { Tournament, UserStatus } from '../lib/amplify/API';
import orderBy from 'lodash/orderBy';
import useUser from './useUsers';
import { formatPercentage } from '../lib/helpers';

export type StatsProps = {
  username: string;
  place: number;
  name: string;
  photo: string;
  initials: string;
  value: number;
}

const useStats = () => {

  const [ { users }, userActions ] = useUser();
  const usersById = users.reduce((map: any, user: any) => {
    map[user.username] = user;
    return map;
  }, {});
  console.log({ usersById })

  const getStats = (list: Tournament[]) => {
    let players:any = {};
    let finalTable:any = {};

    for (let tournament of list) {
      console.log({ tournament });
      const leaderboard = orderBy(tournament.leaderboard || [], ['place'], ['asc']); // make sure its ordered by place

      for (let i = 0; i < leaderboard.length; i++) {
        const player = leaderboard[i];
        if (usersById[player.username]?.status !== UserStatus.ACTIVE) continue;

        if (!players[player.username]) {
            players[player.username] = {}
        }
        players[player.username].user = {
          username: player?.username,
          name: player?.name,
          photo: player?.photo,
          initials: player?.initials,
        };
        players[player.username].p1 = (players[player.username]?.p1 || 0) + ((player.place === 1) ? 1 : 0);
        players[player.username].p2 = (players[player.username]?.p2 || 0) + ((player.place === 2) ? 1 : 0);
        players[player.username].p3 = (players[player.username]?.p3 || 0) + ((player.place === 3) ? 1 : 0);
        players[player.username].final = (players[player.username]?.final || 0) + ((player.place === 1 || player.place === 2) ? 1 : 0);
        players[player.username].buyIn = (players[player.username].buyIn || 0) + Math.round(player?.buyIn ? player.buyIn / (tournament?.buyIn || 15) : 0);
        players[player.username].totalInvested = (players[player.username].totalInvested || 0) + player.buyIn;
        players[player.username].totalPrize = (players[player.username].totalPrize || 0) + player.prize;
        players[player.username].played = (players[player.username].played || 0) + 1;


        const netProfit = players[player.username].totalPrize - players[player.username].totalInvested;
        const roi = (netProfit / players[player.username].totalInvested) * 100;

        players[player.username].roi = formatPercentage(roi);

        if (player.place === 1) {
          let finalPlayers = orderBy([player, leaderboard[i+1]], ['name'], ['asc']);
          const key = `${finalPlayers[0].username}-${finalPlayers[1].username}`;
          if (!finalTable[key]) finalTable[key] = {
            player1: finalPlayers[0],
            player2: finalPlayers[1],
            count: 0,
            [`wins_${finalPlayers[0].username}`]: 0,
            [`wins_${finalPlayers[1].username}`]: 0,
          };
          finalTable[key].count++;

          const winner = finalPlayers[0].place === 1 ? 0 : 1;
          finalTable[key][`wins_${finalPlayers[winner].username}`]++;
        }
      }
    }
    finalTable = orderBy(Object.keys(finalTable).map(key => finalTable[key]), ['count'], ['desc']);
    finalTable = finalTable.map((item: any) => ({
      player1: item.player1,
      player1Wins: item[`wins_${item.player1.username}`],
      total: item.count,
      player2: item.player2,
      player2Wins: item[`wins_${item.player2.username}`],
    }));


    players = Object.keys(players).map(key => players[key]);
    const p1 = orderPlayers(players, 'p1');
    const p2 = orderPlayers(players, 'p2');
    const p3 = orderPlayers(players, 'p3');
    const final = orderPlayers(players, 'final');
    const buyIn = orderPlayers(players, 'buyIn');
    const played = orderPlayers(players, 'played');
    const totalPrize = orderPlayers(players, 'totalPrize');
    const totalInvested = orderPlayers(players, 'totalInvested');
    let roi = orderPlayers(players, 'roi');
    roi = roi.map((player: any) => ({ ...player, value: `${player.value}%` }));



    const response = { p1, p2, p3, final, buyIn, played, finalTable, roi, totalInvested, totalPrize };

    console.log(response);
    return response
  }

  const getProfile = async (list: Tournament[], playerUsername: string) => {
    const { createdAt, updatedAt, ...playerDetails } = await userActions.getByUsername(playerUsername);
    let user = playerDetails;
    let head2Head: any = {};
    let played = 0;
    let playerWins = 0;
    let biggestPrize = 0;
    let totalFinals = 0;
    let totalPrize = 0;
    let tableCountPlayers = [];
    let totalInvestment = 0;

    for (let tournament of list) {
      const leaderboard = orderBy(tournament.leaderboard || [], ['place'], ['asc']); // make sure its ordered by place
      tableCountPlayers.push(leaderboard.length);

      // Check if has played
      const playedTournament = leaderboard.filter((player: any) => player.username === playerUsername)
      const hasPlayed = playedTournament.length > 0;
      played += hasPlayed ? 1 : 0;
      totalInvestment += (hasPlayed ? (playedTournament[0]?.buyIn || 0) : 0);

      // Get the first and second so we can define if there was a final table
      const player1 = leaderboard[0];
      const player2 = leaderboard[1];

      // This means a headto head with the user
      if (player1.username === playerUsername || player2.username === playerUsername) {
        totalFinals += 1;
        const isPlayerFirst = player1.username === playerUsername;
        playerWins += isPlayerFirst ? 1 : 0;
        const opponentPlayer = (isPlayerFirst) ? player2 : player1;
        const userPlayer = (isPlayerFirst) ? player1 : player2;

        biggestPrize = Math.max(biggestPrize, (userPlayer?.prize || 0));

        // wins and loss of the oponent player
        const wins = (isPlayerFirst) ? 0 : 1;
        const loss = (isPlayerFirst) ? 1 : 0;

        let opponentWins = (head2Head[opponentPlayer.username]?.wins || 0) + wins;
        let opponentLoss = (head2Head[opponentPlayer.username]?.loss || 0) + loss;

        totalPrize += userPlayer.prize || 0;

        head2Head[opponentPlayer.username] = {
          ...head2Head[opponentPlayer.username],
          user: {
            initials: opponentPlayer.initials,
            name: opponentPlayer.name,
            photo: opponentPlayer.photo,
            username: opponentPlayer.username,
          },
          wins: opponentWins,
          loss: opponentLoss,
          played: opponentWins + opponentLoss,
          totalPrizeOpponent: (head2Head[opponentPlayer.username]?.totalPrizeOpponent || 0) + opponentPlayer.prize,
          totalPrizeUser: (head2Head[opponentPlayer.username]?.totalPrizeUser || 0) + userPlayer.prize,
        }
      }
    }

    head2Head = orderBy(Object.keys(head2Head).map(key => head2Head[key]), ['played', 'loss'], ['desc', 'desc'])

    let numPlayed = Math.max(...head2Head.map((obj: any) => obj.played));
    let biggestRivals = head2Head.filter((obj: any) => obj.played === numPlayed);

    // calculate the roi
    const netProfit = totalPrize - totalInvestment;
    const roi = formatPercentage((netProfit / totalInvestment) * 100);

    const response = {
      user,
      wins: playerWins,
      played,
      head2Head,
      biggestRivals,
      biggestPrize,
      totalFinals,
      totalPrize,
      totalInvestment,
      roi,
      winRate: formatPercentage((playerWins / played) * 100),
      tableCountPlayers: findBetterTableCountPerformance(tableCountPlayers),
    };
    console.log(response);
    return response;
  }

  return { getStats, getProfile }
};

function orderPlayers(players: any, key: string) {
  return orderBy(players, [key, 'name'], ['desc', 'asc']).map((player, index) => ({
    place: (index+1),
    username: player.user.username,
    photo: player.user.photo,
    name: player.user.name,
    value: player[key]
  })).splice(0, 5) as StatsProps[];
}

function findBetterTableCountPerformance(arr: any) {
  // create a frequency map
  let frequencyMap = arr.reduce((map: any, num: number) => {
    map[num] = (map[num] || 0) + 1;
    return map;
  }, {});

  // find the highest frequency
  let highestFrequency = Math.max(...Object.values(frequencyMap) as number[]);

  // filter the frequency map to only include numbers with the highest frequency
  let mostFrequentNumbers = Object.keys(frequencyMap).filter(num => frequencyMap[num] === highestFrequency);

  // convert string numbers back to actual numbers
  return mostFrequentNumbers.map(Number);
}

export default useStats;