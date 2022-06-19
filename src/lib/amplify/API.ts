/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  username: string,
  email: string,
  name: string,
  initials?: string | null,
  photo?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  initials?: ModelStringInput | null,
  photo?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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

export type User = {
  __typename: "User",
  username: string,
  email: string,
  name: string,
  initials?: string | null,
  photo?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteUserInput = {
  username: string,
};

export type CreateTournamentInput = {
  id?: string | null,
  name?: string | null,
  date?: string | null,
  totalPrize?: number | null,
  leaderboard?: Array< TournamentLeaderboardInput > | null,
};

export type TournamentLeaderboardInput = {
  place: number,
  username: string,
  email: string,
  name: string,
  photo?: string | null,
  buyIn?: number | null,
  prize?: number | null,
};

export type ModelTournamentConditionInput = {
  name?: ModelStringInput | null,
  date?: ModelStringInput | null,
  totalPrize?: ModelFloatInput | null,
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

export type Tournament = {
  __typename: "Tournament",
  id: string,
  name?: string | null,
  date?: string | null,
  totalPrize?: number | null,
  leaderboard?:  Array<TournamentLeaderboard > | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type TournamentLeaderboard = {
  __typename: "TournamentLeaderboard",
  place: number,
  username: string,
  email: string,
  name: string,
  photo?: string | null,
  buyIn?: number | null,
  prize?: number | null,
};

export type DeleteTournamentInput = {
  id: string,
};

export type UpdateUserInput = {
  username: string,
  email?: string | null,
  name?: string | null,
  initials?: string | null,
  photo?: string | null,
};

export type UpdateTournamentInput = {
  id: string,
  name?: string | null,
  date?: string | null,
  totalPrize?: number | null,
  leaderboard?: Array< TournamentLeaderboardInput > | null,
};

export type ModelUserFilterInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  initials?: ModelStringInput | null,
  photo?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelTournamentFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  date?: ModelStringInput | null,
  totalPrize?: ModelFloatInput | null,
  and?: Array< ModelTournamentFilterInput | null > | null,
  or?: Array< ModelTournamentFilterInput | null > | null,
  not?: ModelTournamentFilterInput | null,
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

export type ModelTournamentConnection = {
  __typename: "ModelTournamentConnection",
  items:  Array<Tournament | null >,
  nextToken?: string | null,
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
    initials?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
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
    initials?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
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
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
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
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
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
    initials?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
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
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
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
    initials?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
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
      initials?: string | null,
      photo?: string | null,
      createdAt: string,
      updatedAt: string,
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
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
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
      date?: string | null,
      totalPrize?: number | null,
      leaderboard?:  Array< {
        __typename: "TournamentLeaderboard",
        place: number,
        username: string,
        email: string,
        name: string,
        photo?: string | null,
        buyIn?: number | null,
        prize?: number | null,
      } > | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTournamentPublicSubscription = {
  onCreateTournamentPublic?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTournamentPublicSubscription = {
  onUpdateTournamentPublic?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTournamentPublicSubscription = {
  onDeleteTournamentPublic?:  {
    __typename: "Tournament",
    id: string,
    name?: string | null,
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
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
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
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
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
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
    date?: string | null,
    totalPrize?: number | null,
    leaderboard?:  Array< {
      __typename: "TournamentLeaderboard",
      place: number,
      username: string,
      email: string,
      name: string,
      photo?: string | null,
      buyIn?: number | null,
      prize?: number | null,
    } > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
