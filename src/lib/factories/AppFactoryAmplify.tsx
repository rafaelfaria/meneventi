import { App } from "./types";
import AuthRepositoryAmplify from "../auth/AuthRepositoryAmplify";
import UsersRepositoryAmplify from "../users/UsersRepositoryAmplify";
import TournamentsRepositoryAmplify from "../tournaments/TournamentsRepositoryAmplify";

const authRepository = new AuthRepositoryAmplify();
const usersRepository = new UsersRepositoryAmplify();
const tournamentsRepository = new TournamentsRepositoryAmplify();

export const createApp = (): App => {
  return {
    authRepository,
    usersRepository,
    tournamentsRepository
  }
};
