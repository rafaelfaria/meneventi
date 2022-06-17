import { CreateTeamResult, DeleteTeamResult, GetTeamResult, ListTeamsResult, TeamsRepositoryInterface, UpdateTeamResult } from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { CreateTeamInput, UpdateTeamInput, Team } from "../amplify/API";
import { getTeam, listTeams, } from "../amplify/graphql/queries";
import { createTeam, deleteTeam, updateTeam } from "../amplify/graphql/mutations";
import orderBy from 'lodash/orderBy';
import { ListParams } from "../factories/types";

export default class TeamsRepositoryAmplify implements TeamsRepositoryInterface {

  /**
   * Fetch the alert details
   */
  async getById(teamId: string) {
    const { data } = await API.graphql(
      graphqlOperation(getTeam, { id: teamId })
    ) as GetTeamResult;

    if (!data) {
      throw new Error(`Cant get the team id ${teamId}`);
    }

    return data.getTeam;
  }

  /**
   * Create a alert and its details
   */
  async create(input: CreateTeamInput) {
    const { data } = await API.graphql(
      graphqlOperation(createTeam, { input: { ...input } })
    ) as CreateTeamResult;

    if (!data) {
      throw new Error('Falha tentando criar um novo alerta');
    }

    return data.createTeam;
  }

  /**
   * Update the alert details
   */
  async save(teamId: string, input: Partial<UpdateTeamInput>) {
    const { data } = await API.graphql(
      graphqlOperation(updateTeam, { input: { ...input, id: teamId } })
    ) as UpdateTeamResult;

    if (!data) {
      throw new Error(`Falha tentando salvar o alerta ${teamId}`);
    }

    return data.updateTeam;
  }

  /**
   * Delete alert
   */
  async delete(teamId: string) {
    const { data } = (await API.graphql(
      graphqlOperation(deleteTeam, { input: { id: teamId } })
    )) as DeleteTeamResult;

    if (!data) {
      throw new Error(`Falha tentando apagar o alerta ${teamId}`);
    }

    return data.deleteTeam;
  }

  /**
   * Fetch the list of events associated to the tokens
   */
  async list(params?: ListParams, results?: Team[]): Promise<Team[]> {

    let { limit = 1000, filter = null, nextToken } = params || {};

    const { data } = (await API.graphql(
      graphqlOperation(listTeams, { limit, filter, nextToken })
    )) as ListTeamsResult;

    if (!data) {
      throw new Error("Error trying to get the list");
    }

    const items = [ ...(!results ? [] : results), ...data.listTeams.items ] as Team[];

    if (!data.listTeams.nextToken) {
      return orderBy(items, ['createdAt'], ['asc', 'desc'])
    } else {
      return this.list({ ...params, nextToken: data.listTeams.nextToken }, items) as Promise<Team[]>;
    }
  }
}
