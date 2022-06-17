import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';

export type App = {
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
