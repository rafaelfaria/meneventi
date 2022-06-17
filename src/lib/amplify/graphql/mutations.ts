/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      username
      email
      name
      initials
      photo
      createdAt
      updatedAt
      teamUsersId
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      username
      email
      name
      initials
      photo
      createdAt
      updatedAt
      teamUsersId
    }
  }
`;
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          username
          email
          name
          initials
          photo
          createdAt
          updatedAt
          teamUsersId
        }
        nextToken
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
              items {
                username
                email
                name
                initials
                photo
                createdAt
                updatedAt
                teamUsersId
              }
              nextToken
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
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          username
          email
          name
          initials
          photo
          createdAt
          updatedAt
          teamUsersId
        }
        nextToken
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
              items {
                username
                email
                name
                initials
                photo
                createdAt
                updatedAt
                teamUsersId
              }
              nextToken
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
export const createTournament = /* GraphQL */ `
  mutation CreateTournament(
    $input: CreateTournamentInput!
    $condition: ModelTournamentConditionInput
  ) {
    createTournament(input: $input, condition: $condition) {
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
          items {
            username
            email
            name
            initials
            photo
            createdAt
            updatedAt
            teamUsersId
          }
          nextToken
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
                nextToken
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
export const deleteTournament = /* GraphQL */ `
  mutation DeleteTournament(
    $input: DeleteTournamentInput!
    $condition: ModelTournamentConditionInput
  ) {
    deleteTournament(input: $input, condition: $condition) {
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
          items {
            username
            email
            name
            initials
            photo
            createdAt
            updatedAt
            teamUsersId
          }
          nextToken
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
                nextToken
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      username
      email
      name
      initials
      photo
      createdAt
      updatedAt
      teamUsersId
    }
  }
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          username
          email
          name
          initials
          photo
          createdAt
          updatedAt
          teamUsersId
        }
        nextToken
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
              items {
                username
                email
                name
                initials
                photo
                createdAt
                updatedAt
                teamUsersId
              }
              nextToken
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
export const updateTournament = /* GraphQL */ `
  mutation UpdateTournament(
    $input: UpdateTournamentInput!
    $condition: ModelTournamentConditionInput
  ) {
    updateTournament(input: $input, condition: $condition) {
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
          items {
            username
            email
            name
            initials
            photo
            createdAt
            updatedAt
            teamUsersId
          }
          nextToken
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
                nextToken
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
