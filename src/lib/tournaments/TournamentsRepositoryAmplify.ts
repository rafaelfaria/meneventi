import { CreateTournamentResult, DeleteTournamentResult, GetTournamentResult, ListTournamentsResult, TournamentsRepositoryInterface, UpdateTournamentResult } from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { CreateTournamentInput, UpdateTournamentInput, Tournament } from "../amplify/API";
import { getTournament, listTournaments, } from "../amplify/graphql/queries";
import { createTournament, deleteTournament, updateTournament } from "../amplify/graphql/mutations";
import orderBy from 'lodash/orderBy';
import { ListParams } from "../factories/types";

export default class TournamentsRepositoryAmplify implements TournamentsRepositoryInterface {

  /**
   * Fetch the alert details
   */
  async getById(tournamentId: string) {
    const { data } = await API.graphql(
      graphqlOperation(getTournament, { id: tournamentId })
    ) as GetTournamentResult;

    if (!data) {
      throw new Error(`Cant get the tournament id ${tournamentId}`);
    }

    return data.getTournament;
  }

  /**
   * Create a alert and its details
   */
  async create(input: CreateTournamentInput) {
    const { data } = await API.graphql(
      graphqlOperation(createTournament, { input: { ...input } })
    ) as CreateTournamentResult;

    if (!data) {
      throw new Error('Falha tentando criar um novo alerta');
    }

    return data.createTournament;
  }

  /**
   * Update the alert details
   */
  async save(tournamentId: string, input: Partial<UpdateTournamentInput>) {
    const { data } = await API.graphql(
      graphqlOperation(updateTournament, { input: { ...input, id: tournamentId } })
    ) as UpdateTournamentResult;

    if (!data) {
      throw new Error(`Falha tentando salvar o alerta ${tournamentId}`);
    }

    return data.updateTournament;
  }

  /**
   * Delete alert
   */
  async delete(tournamentId: string) {
    const { data } = (await API.graphql(
      graphqlOperation(deleteTournament, { input: { id: tournamentId } })
    )) as DeleteTournamentResult;

    if (!data) {
      throw new Error(`Falha tentando apagar o alerta ${tournamentId}`);
    }

    return data.deleteTournament;
  }

  /**
   * Fetch the list of events associated to the tokens
   */
  async list(params?: ListParams, results?: Tournament[]): Promise<Tournament[]> {

    let { limit = 1000, filter = null, nextToken } = params || {};

    const { data } = (await API.graphql(
      graphqlOperation(listTournaments, { limit, filter, nextToken })
    )) as ListTournamentsResult;

    if (!data) {
      throw new Error("Error trying to get the list");
    }

    const items = [ ...(!results ? [] : results), ...data.listTournaments.items ] as Tournament[];

    if (!data.listTournaments.nextToken) {
      return orderBy(items, ['createdAt'], ['asc', 'desc'])
    } else {
      return this.list({ ...params, nextToken: data.listTournaments.nextToken }, items) as Promise<Tournament[]>;
    }
  }
}
