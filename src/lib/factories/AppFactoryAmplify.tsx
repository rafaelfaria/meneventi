import { App } from "./types";
import AuthRepositoryAmplify from "../auth/AuthRepositoryAmplify";
import UsersRepositoryAmplify from "../users/UsersRepositoryAmplify";

const authRepository = new AuthRepositoryAmplify();
const usersRepository = new UsersRepositoryAmplify();

export const createApp = (): App => {
  return {
    authRepository,
    usersRepository,
  }
};
