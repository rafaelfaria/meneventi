/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createTournament = /* GraphQL */ `mutation CreateTournament(
  $input: CreateTournamentInput!
  $condition: ModelTournamentConditionInput
) {
  createTournament(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTournamentMutationVariables,
  APITypes.CreateTournamentMutation
>;
export const deleteTournament = /* GraphQL */ `mutation DeleteTournament(
  $input: DeleteTournamentInput!
  $condition: ModelTournamentConditionInput
) {
  deleteTournament(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTournamentMutationVariables,
  APITypes.DeleteTournamentMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const updateTournament = /* GraphQL */ `mutation UpdateTournament(
  $input: UpdateTournamentInput!
  $condition: ModelTournamentConditionInput
) {
  updateTournament(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTournamentMutationVariables,
  APITypes.UpdateTournamentMutation
>;
