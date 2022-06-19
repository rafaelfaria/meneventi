/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTournamentPublic = /* GraphQL */ `
  subscription OnCreateTournamentPublic {
    onCreateTournamentPublic {
      id
      name
      date
      totalPrize
      buyIn
      leaderboard {
        place
        username
        email
        name
        photo
        buyIn
        prize
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTournamentPublic = /* GraphQL */ `
  subscription OnUpdateTournamentPublic {
    onUpdateTournamentPublic {
      id
      name
      date
      totalPrize
      buyIn
      leaderboard {
        place
        username
        email
        name
        photo
        buyIn
        prize
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTournamentPublic = /* GraphQL */ `
  subscription OnDeleteTournamentPublic {
    onDeleteTournamentPublic {
      id
      name
      date
      totalPrize
      buyIn
      leaderboard {
        place
        username
        email
        name
        photo
        buyIn
        prize
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateTournament = /* GraphQL */ `
  subscription OnCreateTournament($owner: String) {
    onCreateTournament(owner: $owner) {
      id
      name
      date
      totalPrize
      buyIn
      leaderboard {
        place
        username
        email
        name
        photo
        buyIn
        prize
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTournament = /* GraphQL */ `
  subscription OnUpdateTournament($owner: String) {
    onUpdateTournament(owner: $owner) {
      id
      name
      date
      totalPrize
      buyIn
      leaderboard {
        place
        username
        email
        name
        photo
        buyIn
        prize
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTournament = /* GraphQL */ `
  subscription OnDeleteTournament($owner: String) {
    onDeleteTournament(owner: $owner) {
      id
      name
      date
      totalPrize
      buyIn
      leaderboard {
        place
        username
        email
        name
        photo
        buyIn
        prize
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
