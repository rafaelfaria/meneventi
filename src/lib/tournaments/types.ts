import { GraphQLResult } from "@aws-amplify/api";
import { Tournament, CreateTournamentInput, UpdateTournamentInput } from "../amplify/API";
import { ListParams } from "../factories/types";

export interface TournamentsRepositoryInterface {
  getById(alertId: string): Promise<Tournament>;
  list(params?: ListParams, results?: Tournament[]): Promise<Tournament[]>
  create(value: CreateTournamentInput): Promise<Tournament>;
  save(alertId: string, value: Partial<UpdateTournamentInput>): Promise<Tournament>;
  delete(alertId: string): Promise<Tournament>;
}

/**
 * Tournament
 ****************************************/
export type GetTournamentResult = GraphQLResult<{
  getTournament: Tournament;
}>;

export type CreateTournamentResult = GraphQLResult<{
  createTournament: Tournament;
}>;

export type UpdateTournamentResult = GraphQLResult<{
  updateTournament: Tournament;
}>;

export type DeleteTournamentResult = GraphQLResult<{
  deleteTournament: Tournament;
}>;

export type ListTournamentsResult = GraphQLResult<{
  listTournaments: { items: Tournament[], nextToken: string | null };
}>;
