import { API, graphqlOperation } from "aws-amplify";
import { getUser, listUsers } from "../amplify/graphql/queries";
import { CreateUserResult, DeleteUserResult, GetUserResult, ListUsersResult, UpdateUserResult, UsersRepositoryInterface } from "./types";
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import orderBy from 'lodash/orderBy';
import { createUser, deleteUser, updateUser } from "../amplify/graphql/mutations";
import { isUserAdmin } from "../helpers/auth";
import { CreateUserInput, UpdateUserInput, User } from "../amplify/API";
import { ListParams } from "../factories/types";
import { sendRequestGET, sendRequestPOST } from "../helpers/amplify-apis";

export default class UsersRepositoryAmplify implements UsersRepositoryInterface {

  async getUser(username: string) {
    let path = '/getUser';
    return await sendRequestGET('AdminQueries', path, { username });
  }

  async getUserGroups(username: string) {
    let path = '/listGroupsForUser';
    return await sendRequestGET('AdminQueries', path, { username });
  }

  async addUserToGroup(username: string, groupName: string) {
    let path = '/addUserToGroup';
    return await sendRequestPOST('AdminQueries', path, { body: { username, groupname: groupName } });
  }

  async removeUserFromGroup(username: string, groupName: string) {
    let path = '/removeUserFromGroup';
    return await sendRequestPOST('AdminQueries', path, { body: { username, groupname: groupName } });
  }

  // async confirmUserSignUp(username: string) {
  //   let path = '/confirmUserSignUp';
  //   return await sendRequest('AdminQueries', path, { body: { username } });
  // }

  async createUser(username: string, name: string) {
    let path = '/createUser';
    const resp = await sendRequestPOST('AdminQueries', path, { body: { username, name } });
    return resp;
  }

  async enableUser(username: string) {
    let path = '/enabledUser';
    return await sendRequestPOST('AdminQueries', path, { body: { username } });
  }

  async disableUser(username: string) {
    let path = '/disableUser';
    return await sendRequestPOST('AdminQueries', path, { body: { username } });
  }

  async signUserOut(username: string) {
    let path = '/signUserOut';
    return await sendRequestPOST('AdminQueries', path, { body: { username } });
  }


  async deleteUser(username: string) {
    let path = '/deleteUser';
    return await sendRequestPOST('AdminQueries', path, { body: { username } });
  }


  /**
   * Get the event details
   */
  async getByUsername(username: string) {
    const { data } = (await API.graphql({
          query: getUser,
          variables: { username },
          authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
      })) as GetUserResult;

    if (!data) {
      throw new Error("Falha ao pegar as informações do usuário");
    }

    return data.getUser;
  }

  /**
   * Create a token and its details
   */
  async create(input: Omit<CreateUserInput, 'username'>) {
    const isAdmin = await isUserAdmin();

    if (!isAdmin) {
      throw new Error('Você não tem accesso para fazer esta operação');
    }

    const cognitoUser = await this.createUser(input.email, input.name);

    const { data } = await API.graphql(
      graphqlOperation(createUser, { input: { username: cognitoUser.User.Username, ...input } })
    ) as CreateUserResult;

    if (!data) {
      throw new Error("Falha ao criar um novo usuário");
    }

    return data.createUser;
  }

  /**
   * Update the token details
   */
  async save(username: string, input: Partial<UpdateUserInput>) {

    const { data } = await API.graphql(
      graphqlOperation(updateUser, { input: { ...input, username } })
    ) as UpdateUserResult;

    if (!data) {
      throw new Error("Falha ao salvar um usuário");
    }

    return data.updateUser;
  }

  /**
   * Delete token event
   */
  async delete(username: string) {
    const isAdmin = await isUserAdmin();

    if (!isAdmin) {
      throw new Error('Você não tem accesso para fazer esta operação');
    }

    try {
      await this.deleteUser(username);
    } catch (err) {
      console.log('delete cognito user error', err);
    }

    const { data } = (await API.graphql(
      graphqlOperation(deleteUser, { input: { username } })
    )) as DeleteUserResult;

    if (!data) {
      throw new Error(`Não foi possível apagar o usuário ${username}`);
    }
    return data.deleteUser;
  }


  /**
   * Fetch the list of events associated to the tokens
   */
  async list(params?: ListParams, results?: User[]): Promise<User[]> {

    let { limit = 1000, filter = null, nextToken } = params || {};

    const { data } = (await API.graphql({
          query: listUsers,
          variables: {
            limit,
            filter,
            nextToken
          },
          authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
      },)) as ListUsersResult;


    if (!data) {
      throw new Error("Houve uma falha tentando pegar a lista de usuários");
    }

    const items = [ ...(!results ? [] : results), ...data.listUsers.items ] as User[];

    if (!data.listUsers.nextToken) {
      return orderBy(items, ['name', 'createdAt'], ['asc', 'desc'])
    } else {
      return this.list({ ...params, nextToken: data.listUsers.nextToken }, items) as Promise<User[]>;
    }
  }


  // async listGroups(limit?: number, nextToken?: string) {
  //   let path = '/listGroups';

  //   const { NextToken, ...rest } =  await sendRequest('AdminQueries', path, {
  //       queryStringParameters: {
  //         limit: limit,
  //         token: nextToken
  //       },
  //   })

  //   if (!NextToken) {
  //     return rest;
  //   } else {
  //     return this.listUsers(limit, NextToken);
  //   }
  // }

}
