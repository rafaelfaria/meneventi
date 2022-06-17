/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam($owner: String) {
    onCreateTeam(owner: $owner) {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam($owner: String) {
    onUpdateTeam(owner: $owner) {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam($owner: String) {
    onDeleteTeam(owner: $owner) {
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
export const onCreateTournament = /* GraphQL */ `
  subscription OnCreateTournament($owner: String) {
    onCreateTournament(owner: $owner) {
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
export const onUpdateTournament = /* GraphQL */ `
  subscription OnUpdateTournament($owner: String) {
    onUpdateTournament(owner: $owner) {
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
export const onDeleteTournament = /* GraphQL */ `
  subscription OnDeleteTournament($owner: String) {
    onDeleteTournament(owner: $owner) {
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
