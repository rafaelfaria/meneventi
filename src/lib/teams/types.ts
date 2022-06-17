import { GraphQLResult } from "@aws-amplify/api";
import { Team, CreateTeamInput, UpdateTeamInput } from "../amplify/API";
import { ListParams } from "../factories/types";

export interface TeamsRepositoryInterface {
  getById(teamId: string): Promise<Team>;
  list(params?: ListParams, results?: Team[]): Promise<Team[]>
  create(value: CreateTeamInput): Promise<Team>;
  save(teamId: string, value: Partial<UpdateTeamInput>): Promise<Team>;
  delete(teamId: string): Promise<Team>;
}

/**
 * Team
 ****************************************/
export type GetTeamResult = GraphQLResult<{
  getTeam: Team;
}>;

export type CreateTeamResult = GraphQLResult<{
  createTeam: Team;
}>;

export type UpdateTeamResult = GraphQLResult<{
  updateTeam: Team;
}>;

export type DeleteTeamResult = GraphQLResult<{
  deleteTeam: Team;
}>;

export type ListTeamsResult = GraphQLResult<{
  listTeams: { items: Team[], nextToken: string | null };
}>;
