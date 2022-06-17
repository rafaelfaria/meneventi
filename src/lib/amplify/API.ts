/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  username: string,
  email: string,
  name: string,
  photo?: string | null,
  teamUsersId?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  photo?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  teamUsersId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type User = {
  __typename: "User",
  username: string,
  email: string,
  name: string,
  photo?: string | null,
  createdAt: string,
  updatedAt: string,
  teamUsersId?: string | null,
};

export type DeleteUserInput = {
  username: string,
};

export type CreateTeamInput = {
  id?: string | null,
  name: string,
};

export type ModelTeamConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelTeamConditionInput | null > | null,
  or?: Array< ModelTeamConditionInput | null > | null,
  not?: ModelTeamConditionInput | null,
};

export type Team = {
  __typename: "Team",
  id: string,
  name: string,
  users?: ModelUserConnection | null,
  tournament?: ModelTournamentConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelTournamentConnection = {
  __typename: "ModelTournamentConnection",
  items:  Array<Tournament | null >,
  nextToken?: string | null,
};

export type Tournament = {
  __typename: "Tournament",
  id: string,
  name?: string | null,
  date: string,
  totalPrize?: number | null,
  leaderboard?:  Array<TornamentLeaderboard | null > | null,
  teamID: string,
  team?: Team | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type TornamentLeaderboard = {
  __typename: "TornamentLeaderboard",
  place: number,
  userID: string,
  prize?: number | null,
};

export type DeleteTeamInput = {
  id: string,
};

export type CreateTournamentInput = {
  id?: string | null,
  name?: string | null,
  date: string,
  totalPrize?: number | null,
  leaderboard?: Array< TornamentLeaderboardInput | null > | null,
  teamID: string,
};

export type TornamentLeaderboardInput = {
  place: number,
  userID: string,
  prize?: number | null,
};

export type ModelTournamentConditionInput = {
  name?: ModelStringInput | null,
  date?: ModelStringInput | null,
  totalPrize?: ModelFloatInput | null,
  teamID?: ModelIDInput | null,
  and?: Array< ModelTournamentConditionInput | null > | null,
  or?: Array< ModelTournamentConditionInput | null > | null,
  not?: ModelTournamentConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type DeleteTournamentInput = {
  id: string,
};

export type UpdateUserInput = {
  username: string,
  email?: string | null,
  name?: string | null,
  photo?: string | null,
  teamUsersId?: string | null,
};

export type UpdateTeamInput = {
  id: string,
  name?: string | null,
};

export type UpdateTournamentInput = {
  id: string,
  name?: string | null,
  date?: string | null,
  totalPrize?: number | null,
  leaderboard?: Array< TornamentLeaderboardInput | null > | null,
  teamID?: string | null,
};

export type ModelUserFilterInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  photo?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  teamUsersId?: ModelIDInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelTeamFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelTeamFilterInput | null > | null,
  or?: Array< ModelTeamFilterInput | null > | null,
  not?: ModelTeamFilterInput | null,
};

export type ModelTeamConnection = {
  __typename: "ModelTeamConnection",
  items:  Array<Team | null >,
  nextToken?: string | null,
};

export type ModelTournamentFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  date?: ModelStringInput | null,
  totalPrize?: ModelFloatInput | null,
  teamID?: ModelIDInput | null,
  and?: Array< ModelTournamentFilterInput | null > | null,
  or?: Array< ModelTournamentFilterInput | null > | null,
  not?: ModelTournamentFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    username: string,
    email: string,
    name: string,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
    teamUsersId?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    username: string,
    email: string,
    name: string,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
    teamUsersId?: string | null,
  } | null,
};

export type CreateTeamMutationVariables = {
  input: CreateTeamInput,
  condition?: ModelTeamConditionInput | null,
};

export type CreateTeamMutation = {
  createTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        username: string,
        email: string,
        name: string,
        photo?: string | null,
        createdAt: string,
        updatedAt: string,
        teamUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tournament?:  {
      __typename: "ModelTournamentConnection",
      items:  Array< {
        __typename: "Tournament",
        id: string,
        name?: string | null,
        date: string,
        totalPrize?: number | null,
        leaderboard?:  Array< {
          __typename: "TornamentLeaderboard",
          place: number,
          userID: string,
          prize?: number | null,
        } | null > | null,
        teamID: string,
        team?:  {
          __typename: "Team",
          id: string,
          name: string,
          users?:  {
            __typename: "ModelUserConnection",
            items:  Array< {
              __typename: "User",
              username: string,
              email: string,
              name: string,
              photo?: string | null,
              createdAt: string,
              updatedAt: string,
              teamUsersId?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          tournament?:  {
            __typename: "ModelTournamentConnection",
            items:  Array< {
              __typename: "Tournament",
              id: string,
              name?: string | null,
              date: string,
              totalPrize?: number | null,
              teamID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteTeamMutationVariables = {
  input: DeleteTeamInput,
  condition?: ModelTeamConditionInput | null,
};

export type DeleteTeamMutation = {
  deleteTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        username: string,
        email: string,
        name: string,
        photo?: string | null,
        createdAt: string,
        updatedAt: string,
        teamUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tournament?:  {
      __typename: "ModelTournamentConnection",
      items:  Array< {
        __typename: "Tournament",
        id: string,
        name?: string | null,
        date: string,
        totalPrize?: number | null,
        leaderboard?:  Array< {
          __typename: "TornamentLeaderboard",
          place: number,
          userID: string,
          prize?: number | null,
        } | null > | null,
        teamID: string,
        team?:  {
          __typename: "Team",
          id: string,
          name: string,
          users?:  {
            __typename: "ModelUserConnection",
            items:  Array< {
              __typename: "User",
              username: string,
              email: string,
              name: string,
              photo?: string | null,
              createdAt: string,
              updatedAt: string,
              teamUsersId?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          tournament?:  {
            __typename: "ModelTournamentConnection",
            items:  Array< {
              __typename: "Tournament",
              id: string,
              name?: string | null,
              date: string,
              totalPrize?: number | null,
              teamID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateTournamentMutationVariables = {
  input: CreateTournamentInput,
  condition?: ModelTournamentConditionInput | null,
};

export type CreateTournamentMutation = {
  createTournament?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date: string,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TornamentLeaderboard",
      place: number,
      userID: string,
      prize?: number | null,
    } | null > | null,
    teamID: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
          __typename: "User",
          username: string,
          email: string,
          name: string,
          photo?: string | null,
          createdAt: string,
          updatedAt: string,
          teamUsersId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      tournament?:  {
        __typename: "ModelTournamentConnection",
        items:  Array< {
          __typename: "Tournament",
          id: string,
          name?: string | null,
          date: string,
          totalPrize?: number | null,
          leaderboard?:  Array< {
            __typename: "TornamentLeaderboard",
            place: number,
            userID: string,
            prize?: number | null,
          } | null > | null,
          teamID: string,
          team?:  {
            __typename: "Team",
            id: string,
            name: string,
            users?:  {
              __typename: "ModelUserConnection",
              nextToken?: string | null,
            } | null,
            tournament?:  {
              __typename: "ModelTournamentConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteTournamentMutationVariables = {
  input: DeleteTournamentInput,
  condition?: ModelTournamentConditionInput | null,
};

export type DeleteTournamentMutation = {
  deleteTournament?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date: string,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TornamentLeaderboard",
      place: number,
      userID: string,
      prize?: number | null,
    } | null > | null,
    teamID: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
          __typename: "User",
          username: string,
          email: string,
          name: string,
          photo?: string | null,
          createdAt: string,
          updatedAt: string,
          teamUsersId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      tournament?:  {
        __typename: "ModelTournamentConnection",
        items:  Array< {
          __typename: "Tournament",
          id: string,
          name?: string | null,
          date: string,
          totalPrize?: number | null,
          leaderboard?:  Array< {
            __typename: "TornamentLeaderboard",
            place: number,
            userID: string,
            prize?: number | null,
          } | null > | null,
          teamID: string,
          team?:  {
            __typename: "Team",
            id: string,
            name: string,
            users?:  {
              __typename: "ModelUserConnection",
              nextToken?: string | null,
            } | null,
            tournament?:  {
              __typename: "ModelTournamentConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    username: string,
    email: string,
    name: string,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
    teamUsersId?: string | null,
  } | null,
};

export type UpdateTeamMutationVariables = {
  input: UpdateTeamInput,
  condition?: ModelTeamConditionInput | null,
};

export type UpdateTeamMutation = {
  updateTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        username: string,
        email: string,
        name: string,
        photo?: string | null,
        createdAt: string,
        updatedAt: string,
        teamUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tournament?:  {
      __typename: "ModelTournamentConnection",
      items:  Array< {
        __typename: "Tournament",
        id: string,
        name?: string | null,
        date: string,
        totalPrize?: number | null,
        leaderboard?:  Array< {
          __typename: "TornamentLeaderboard",
          place: number,
          userID: string,
          prize?: number | null,
        } | null > | null,
        teamID: string,
        team?:  {
          __typename: "Team",
          id: string,
          name: string,
          users?:  {
            __typename: "ModelUserConnection",
            items:  Array< {
              __typename: "User",
              username: string,
              email: string,
              name: string,
              photo?: string | null,
              createdAt: string,
              updatedAt: string,
              teamUsersId?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          tournament?:  {
            __typename: "ModelTournamentConnection",
            items:  Array< {
              __typename: "Tournament",
              id: string,
              name?: string | null,
              date: string,
              totalPrize?: number | null,
              teamID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateTournamentMutationVariables = {
  input: UpdateTournamentInput,
  condition?: ModelTournamentConditionInput | null,
};

export type UpdateTournamentMutation = {
  updateTournament?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date: string,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TornamentLeaderboard",
      place: number,
      userID: string,
      prize?: number | null,
    } | null > | null,
    teamID: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
          __typename: "User",
          username: string,
          email: string,
          name: string,
          photo?: string | null,
          createdAt: string,
          updatedAt: string,
          teamUsersId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      tournament?:  {
        __typename: "ModelTournamentConnection",
        items:  Array< {
          __typename: "Tournament",
          id: string,
          name?: string | null,
          date: string,
          totalPrize?: number | null,
          leaderboard?:  Array< {
            __typename: "TornamentLeaderboard",
            place: number,
            userID: string,
            prize?: number | null,
          } | null > | null,
          teamID: string,
          team?:  {
            __typename: "Team",
            id: string,
            name: string,
            users?:  {
              __typename: "ModelUserConnection",
              nextToken?: string | null,
            } | null,
            tournament?:  {
              __typename: "ModelTournamentConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  username: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    username: string,
    email: string,
    name: string,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
    teamUsersId?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  username?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      createdAt: string,
      updatedAt: string,
      teamUsersId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTeamQueryVariables = {
  id: string,
};

export type GetTeamQuery = {
  getTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        username: string,
        email: string,
        name: string,
        photo?: string | null,
        createdAt: string,
        updatedAt: string,
        teamUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tournament?:  {
      __typename: "ModelTournamentConnection",
      items:  Array< {
        __typename: "Tournament",
        id: string,
        name?: string | null,
        date: string,
        totalPrize?: number | null,
        leaderboard?:  Array< {
          __typename: "TornamentLeaderboard",
          place: number,
          userID: string,
          prize?: number | null,
        } | null > | null,
        teamID: string,
        team?:  {
          __typename: "Team",
          id: string,
          name: string,
          users?:  {
            __typename: "ModelUserConnection",
            items:  Array< {
              __typename: "User",
              username: string,
              email: string,
              name: string,
              photo?: string | null,
              createdAt: string,
              updatedAt: string,
              teamUsersId?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          tournament?:  {
            __typename: "ModelTournamentConnection",
            items:  Array< {
              __typename: "Tournament",
              id: string,
              name?: string | null,
              date: string,
              totalPrize?: number | null,
              teamID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListTeamsQueryVariables = {
  filter?: ModelTeamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeamsQuery = {
  listTeams?:  {
    __typename: "ModelTeamConnection",
    items:  Array< {
      __typename: "Team",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
          __typename: "User",
          username: string,
          email: string,
          name: string,
          photo?: string | null,
          createdAt: string,
          updatedAt: string,
          teamUsersId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      tournament?:  {
        __typename: "ModelTournamentConnection",
        items:  Array< {
          __typename: "Tournament",
          id: string,
          name?: string | null,
          date: string,
          totalPrize?: number | null,
          leaderboard?:  Array< {
            __typename: "TornamentLeaderboard",
            place: number,
            userID: string,
            prize?: number | null,
          } | null > | null,
          teamID: string,
          team?:  {
            __typename: "Team",
            id: string,
            name: string,
            users?:  {
              __typename: "ModelUserConnection",
              nextToken?: string | null,
            } | null,
            tournament?:  {
              __typename: "ModelTournamentConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTournamentQueryVariables = {
  id: string,
};

export type GetTournamentQuery = {
  getTournament?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date: string,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TornamentLeaderboard",
      place: number,
      userID: string,
      prize?: number | null,
    } | null > | null,
    teamID: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
          __typename: "User",
          username: string,
          email: string,
          name: string,
          photo?: string | null,
          createdAt: string,
          updatedAt: string,
          teamUsersId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      tournament?:  {
        __typename: "ModelTournamentConnection",
        items:  Array< {
          __typename: "Tournament",
          id: string,
          name?: string | null,
          date: string,
          totalPrize?: number | null,
          leaderboard?:  Array< {
            __typename: "TornamentLeaderboard",
            place: number,
            userID: string,
            prize?: number | null,
          } | null > | null,
          teamID: string,
          team?:  {
            __typename: "Team",
            id: string,
            name: string,
            users?:  {
              __typename: "ModelUserConnection",
              nextToken?: string | null,
            } | null,
            tournament?:  {
              __typename: "ModelTournamentConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListTournamentsQueryVariables = {
  filter?: ModelTournamentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTournamentsQuery = {
  listTournaments?:  {
    __typename: "ModelTournamentConnection",
    items:  Array< {
      __typename: "Tournament",
      id: string,
      name?: string | null,
      date: string,
      totalPrize?: number | null,
      leaderboard?:  Array< {
        __typename: "TornamentLeaderboard",
        place: number,
        userID: string,
        prize?: number | null,
      } | null > | null,
      teamID: string,
      team?:  {
        __typename: "Team",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserConnection",
          items:  Array< {
            __typename: "User",
            username: string,
            email: string,
            name: string,
            photo?: string | null,
            createdAt: string,
            updatedAt: string,
            teamUsersId?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        tournament?:  {
          __typename: "ModelTournamentConnection",
          items:  Array< {
            __typename: "Tournament",
            id: string,
            name?: string | null,
            date: string,
            totalPrize?: number | null,
            leaderboard?:  Array< {
              __typename: "TornamentLeaderboard",
              place: number,
              userID: string,
              prize?: number | null,
            } | null > | null,
            teamID: string,
            team?:  {
              __typename: "Team",
              id: string,
              name: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTeamSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateTeamSubscription = {
  onCreateTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        username: string,
        email: string,
        name: string,
        photo?: string | null,
        createdAt: string,
        updatedAt: string,
        teamUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tournament?:  {
      __typename: "ModelTournamentConnection",
      items:  Array< {
        __typename: "Tournament",
        id: string,
        name?: string | null,
        date: string,
        totalPrize?: number | null,
        leaderboard?:  Array< {
          __typename: "TornamentLeaderboard",
          place: number,
          userID: string,
          prize?: number | null,
        } | null > | null,
        teamID: string,
        team?:  {
          __typename: "Team",
          id: string,
          name: string,
          users?:  {
            __typename: "ModelUserConnection",
            items:  Array< {
              __typename: "User",
              username: string,
              email: string,
              name: string,
              photo?: string | null,
              createdAt: string,
              updatedAt: string,
              teamUsersId?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          tournament?:  {
            __typename: "ModelTournamentConnection",
            items:  Array< {
              __typename: "Tournament",
              id: string,
              name?: string | null,
              date: string,
              totalPrize?: number | null,
              teamID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTeamSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateTeamSubscription = {
  onUpdateTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        username: string,
        email: string,
        name: string,
        photo?: string | null,
        createdAt: string,
        updatedAt: string,
        teamUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tournament?:  {
      __typename: "ModelTournamentConnection",
      items:  Array< {
        __typename: "Tournament",
        id: string,
        name?: string | null,
        date: string,
        totalPrize?: number | null,
        leaderboard?:  Array< {
          __typename: "TornamentLeaderboard",
          place: number,
          userID: string,
          prize?: number | null,
        } | null > | null,
        teamID: string,
        team?:  {
          __typename: "Team",
          id: string,
          name: string,
          users?:  {
            __typename: "ModelUserConnection",
            items:  Array< {
              __typename: "User",
              username: string,
              email: string,
              name: string,
              photo?: string | null,
              createdAt: string,
              updatedAt: string,
              teamUsersId?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          tournament?:  {
            __typename: "ModelTournamentConnection",
            items:  Array< {
              __typename: "Tournament",
              id: string,
              name?: string | null,
              date: string,
              totalPrize?: number | null,
              teamID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTeamSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteTeamSubscription = {
  onDeleteTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        username: string,
        email: string,
        name: string,
        photo?: string | null,
        createdAt: string,
        updatedAt: string,
        teamUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tournament?:  {
      __typename: "ModelTournamentConnection",
      items:  Array< {
        __typename: "Tournament",
        id: string,
        name?: string | null,
        date: string,
        totalPrize?: number | null,
        leaderboard?:  Array< {
          __typename: "TornamentLeaderboard",
          place: number,
          userID: string,
          prize?: number | null,
        } | null > | null,
        teamID: string,
        team?:  {
          __typename: "Team",
          id: string,
          name: string,
          users?:  {
            __typename: "ModelUserConnection",
            items:  Array< {
              __typename: "User",
              username: string,
              email: string,
              name: string,
              photo?: string | null,
              createdAt: string,
              updatedAt: string,
              teamUsersId?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          tournament?:  {
            __typename: "ModelTournamentConnection",
            items:  Array< {
              __typename: "Tournament",
              id: string,
              name?: string | null,
              date: string,
              totalPrize?: number | null,
              teamID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateTournamentSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateTournamentSubscription = {
  onCreateTournament?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date: string,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TornamentLeaderboard",
      place: number,
      userID: string,
      prize?: number | null,
    } | null > | null,
    teamID: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
          __typename: "User",
          username: string,
          email: string,
          name: string,
          photo?: string | null,
          createdAt: string,
          updatedAt: string,
          teamUsersId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      tournament?:  {
        __typename: "ModelTournamentConnection",
        items:  Array< {
          __typename: "Tournament",
          id: string,
          name?: string | null,
          date: string,
          totalPrize?: number | null,
          leaderboard?:  Array< {
            __typename: "TornamentLeaderboard",
            place: number,
            userID: string,
            prize?: number | null,
          } | null > | null,
          teamID: string,
          team?:  {
            __typename: "Team",
            id: string,
            name: string,
            users?:  {
              __typename: "ModelUserConnection",
              nextToken?: string | null,
            } | null,
            tournament?:  {
              __typename: "ModelTournamentConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTournamentSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateTournamentSubscription = {
  onUpdateTournament?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date: string,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TornamentLeaderboard",
      place: number,
      userID: string,
      prize?: number | null,
    } | null > | null,
    teamID: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
          __typename: "User",
          username: string,
          email: string,
          name: string,
          photo?: string | null,
          createdAt: string,
          updatedAt: string,
          teamUsersId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      tournament?:  {
        __typename: "ModelTournamentConnection",
        items:  Array< {
          __typename: "Tournament",
          id: string,
          name?: string | null,
          date: string,
          totalPrize?: number | null,
          leaderboard?:  Array< {
            __typename: "TornamentLeaderboard",
            place: number,
            userID: string,
            prize?: number | null,
          } | null > | null,
          teamID: string,
          team?:  {
            __typename: "Team",
            id: string,
            name: string,
            users?:  {
              __typename: "ModelUserConnection",
              nextToken?: string | null,
            } | null,
            tournament?:  {
              __typename: "ModelTournamentConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTournamentSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteTournamentSubscription = {
  onDeleteTournament?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date: string,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TornamentLeaderboard",
      place: number,
      userID: string,
      prize?: number | null,
    } | null > | null,
    teamID: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
          __typename: "User",
          username: string,
          email: string,
          name: string,
          photo?: string | null,
          createdAt: string,
          updatedAt: string,
          teamUsersId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      tournament?:  {
        __typename: "ModelTournamentConnection",
        items:  Array< {
          __typename: "Tournament",
          id: string,
          name?: string | null,
          date: string,
          totalPrize?: number | null,
          leaderboard?:  Array< {
            __typename: "TornamentLeaderboard",
            place: number,
            userID: string,
            prize?: number | null,
          } | null > | null,
          teamID: string,
          team?:  {
            __typename: "Team",
            id: string,
            name: string,
            users?:  {
              __typename: "ModelUserConnection",
              nextToken?: string | null,
            } | null,
            tournament?:  {
              __typename: "ModelTournamentConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
