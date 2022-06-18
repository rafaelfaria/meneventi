/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($username: String!) {
    getUser(username: $username) {
      username
      email
      name
      initials
      photo
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $username: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        username
        email
        name
        initials
        photo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      users {
        email
        name
        photo
      }
      tournament {
        items {
          id
          name
          date
          totalPrize
          leaderboard {
            place
            userID
            prize
          }
          teamID
          team {
            id
            name
            users {
              email
              name
              photo
            }
            tournament {
              items {
                id
                name
                date
                totalPrize
                teamID
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        users {
          email
          name
          photo
        }
        tournament {
          items {
            id
            name
            date
            totalPrize
            leaderboard {
              place
              userID
              prize
            }
            teamID
            team {
              id
              name
              users {
                email
                name
                photo
              }
              tournament {
                nextToken
              }
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTournament = /* GraphQL */ `
  query GetTournament($id: ID!) {
    getTournament(id: $id) {
      id
      name
      date
      totalPrize
      leaderboard {
        place
        userID
        prize
      }
      teamID
      team {
        id
        name
        users {
          email
          name
          photo
        }
        tournament {
          items {
            id
            name
            date
            totalPrize
            leaderboard {
              place
              userID
              prize
            }
            teamID
            team {
              id
              name
              users {
                email
                name
                photo
              }
              tournament {
                nextToken
              }
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTournaments = /* GraphQL */ `
  query ListTournaments(
    $filter: ModelTournamentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTournaments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        date
        totalPrize
        leaderboard {
          place
          userID
          prize
        }
        teamID
        team {
          id
          name
          users {
            email
            name
            photo
          }
          tournament {
            items {
              id
              name
              date
              totalPrize
              leaderboard {
                place
                userID
                prize
              }
              teamID
              team {
                id
                name
                createdAt
                updatedAt
                owner
              }
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
