import React, { useEffect, useState } from "react";
import { AuthContext } from ".";
import useApp from "../hooks/useApp";
import { User } from "../lib/amplify/API";
import { AuthUser } from "../lib/auth/types";

export interface AuthProviderInterface {
  authUser?: AuthUser;
  setAuthUser: (user?: AuthUser) => void;
  checkAuth: (user?: AuthUser) => Promise<AuthUser>;
  isChecking?: boolean;
  saveUser: (username: string, settings: Partial<User>) => Promise<User | null>
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>
}

type Props = {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {

  const { authRepository, usersRepository } = useApp();
  const [ authUser, setAuthUser ] = useState<AuthUser | undefined>();
  const [ isChecking, setIsChecking ] = useState<boolean>();

  useEffect(() => {
    (async () => {
      await checkAuth();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      setIsChecking(true);
      const user = await authRepository?.getCurrent();

      if (!user) {
        throw new Error('Not logged in');
      }

      setAuthUser(user);
      setIsChecking(false);

      return user;
    } catch(err: any) {
      console.warn('AuthProvider', { err });
      setIsChecking(false);
      throw new Error(err);
    }
  };

  const saveUser = async (username: string, input: Partial<User>) => {
    try {
      let newUpdatedUser = await usersRepository.save(username, input);

      const user = {
        ...(authUser as AuthUser),
        ...newUpdatedUser
      };

      setAuthUser(user);

      return newUpdatedUser;
    } catch(err: any) {
      console.error(err);
      return null;
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    return await authRepository.changePassword(oldPassword, newPassword);
  }

  const value = { authUser, setAuthUser, changePassword, saveUser, isChecking, checkAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
