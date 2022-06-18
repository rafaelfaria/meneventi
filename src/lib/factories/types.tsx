import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';

import { AuthRepositoryInterface } from "../auth/types";
import { UsersRepositoryInterface } from "../users/types";
import { TeamsRepositoryInterface } from "../teams/types";
import { TournamentsRepositoryInterface } from "../tournaments/types";

export type App = {
  authRepository: AuthRepositoryInterface;
  usersRepository: UsersRepositoryInterface;
  teamsRepository: TeamsRepositoryInterface;
  tournamentsRepository: TournamentsRepositoryInterface;
}


export type ListParams = {
  limit?: number
  filter?: any
  nextToken?: string | null
}

export type SubscriptionConfigType = {
  idProp?: string; // The id property of the repository (ex: id, or username, or tokenAddress)
  config: {
    query: string;
    key: string;
    variables?: any;
    authMode?: GRAPHQL_AUTH_MODE;
  }
}
