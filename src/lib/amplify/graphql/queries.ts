/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($username: String!) {
  getUser(username: $username) {
    username
    email
    name
    initials
    photo
    status
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
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
      status
      type
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getTournament = /* GraphQL */ `query GetTournament($id: ID!) {
  getTournament(id: $id) {
    id
    name
    date
    buyIn
    totalPrize
    leaderboard {
      place
      username
      email
      name
      initials
      photo
      status
      buyIn
      prize
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTournamentQueryVariables,
  APITypes.GetTournamentQuery
>;
export const listTournaments = /* GraphQL */ `query ListTournaments(
  $filter: ModelTournamentFilterInput
  $limit: Int
  $nextToken: String
) {
  listTournaments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      date
      buyIn
      totalPrize
      leaderboard {
        place
        username
        email
        name
        initials
        photo
        status
        buyIn
        prize
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTournamentsQueryVariables,
  APITypes.ListTournamentsQuery
>;
