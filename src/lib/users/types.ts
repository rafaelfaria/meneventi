import { GraphQLResult } from "@aws-amplify/api";
import { CreateUserInput, UpdateUserInput, User } from "../amplify/API";
import { ListParams } from "../factories/types";

export interface UsersRepositoryInterface {
  getUser(username: string): Promise<any>;
  getUserGroups(username: string): Promise<any>;
  getByUsername(username: string): Promise<User>;
  list(params?: ListParams, results?: User[]): Promise<User[]>
  create(value: Omit<CreateUserInput, 'username'>): Promise<User>;
  save(username: string, value: Partial<UpdateUserInput>): Promise<User>;
  delete(username: string): Promise<User>;
  addUserToGroup(username: string, groupName: string): Promise<any>
  removeUserFromGroup(username: string, groupName: string): Promise<any>
}

/**
 * Users
 ****************************************/
export type GetUserResult = GraphQLResult<{
  getUser: Required<User>;
}>;

export type CreateUserResult = GraphQLResult<{
  createUser: User;
}>;

export type UpdateUserResult = GraphQLResult<{
  updateUser: User;
}>;

export type DeleteUserResult = GraphQLResult<{
  deleteUser: User;
}>;

export type ListUsersResult = GraphQLResult<{
  listUsers: { items: User[], nextToken: string | null };
}>;