import { GraphQLResult } from "@aws-amplify/api";
import { User } from "../amplify/API";
import { CognitoUserInterface } from '@aws-amplify/ui-components';

export interface AuthRepositoryInterface {
  getCurrent(): Promise<AuthUser>;
  signIn(email: string, password: string, address?: string | null): Promise<AuthUser>;
  register(email: string, password: string, attributes: RegisterAttributes): Promise<string>;
  confirmRegistration(email: string, code: string): Promise<boolean>;
  resendConfirmationCode(email: string): Promise<string>;
  resetPassword(email: string): Promise<string>;
  setNewPassword(email: string, code: string, newPassword: string): Promise<boolean>;
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>;
  completeNewPassword(user: CognitoUserInterface, newPassword:string): Promise<AuthUser>
  logOut(): Promise<boolean>;
}

export type AuthUser = {
  username: string;
  email: string;
  isEmailVerified?: boolean;
  isAdmin: boolean;
  isSuperAdmin?: boolean;
  userGroups?: string[];
  userPoolId: string;
} & Omit<User, "__typename">;

export type PlanDaysResult = {
  planRemainingDays: number;
  planProgress: number;
}

export type SignInProps = {
  email: string;
  password: string;
}

export type RegisterProps = {
  email: string;
  password: string;
  attributes?: RegisterAttributes;
}

export type RegisterAttributes = {
  name: string;
  zoneinfo?: string; // holds a json stringify information so it can be desconsturcted during setup
}

export type ConfirmRegistrationProps = {
  email: string;
  code: string;
}

export type ResendConfirmationProps = {
  email: string;
}

export type ResetPasswordProps = {
  email: string;
}

export type ResetPasswordCodeProps = {
  email: string;
  code: string;
  newPassword: string;
}