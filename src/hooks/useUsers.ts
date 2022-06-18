import { useMemo, useEffect, useReducer, Reducer, useCallback } from "react";
import { CreateUserInput, User } from "../lib/amplify/API";
import { getErrorMessage } from "../lib/helpers";
import { getInitials } from "../lib/helpers/user";

// type
import useApp from "./useApp";
import useAuth from "./useAuth";

export type State = {
  users: any[];
  user?: any;
  isError: boolean;
  isSaving: boolean;
  isLoadingList: boolean;
  isLoadingUser: boolean;
  errorMessage?: string;
};

export type Actions = {
  getByUsername: (username: string) => Promise<User>;
  create: (user: Omit<CreateUserInput, 'username'>) => Promise<any>;
  delete: (username: string) => Promise<User>;
  save: (username: string, input: Partial<User>) => void;
};

const defaultState: State = {
  users: [],
  isLoadingList: false,
  isLoadingUser: false,
  isError: false,
  isSaving: false
};

type Options = {
  list: boolean
}

const useUser = (initialUsername?: string | null, options?: Options): [State, Actions] => {

  const { usersRepository } =  useApp();
  const { authUser, saveUser } = useAuth();

  // Use reducer to keep the state of data
  const [state, setState] = useReducer<Reducer<State, Partial<State>>>(
    (state, newState) => ({...state, ...newState}),
    defaultState
  );

  // Load the list of users, passing as a parameter if we want to fire the isLoadingList, which often will trigger some sort of loading in the application
  const loadUsers = useCallback(async (isRefreshing?: boolean) => {
    try {
      setState({ isLoadingList: isRefreshing ? false : true, isError: false, isSaving: false })
      const users = await usersRepository.list();
      setState({ users, isLoadingList: false });
    } catch (err: any) {
      console.log(err);
      setState({ isLoadingList: false });
    }
  }, []);

  /**
   * Set loading/saving/error state
   */
  const setSaving = (isSaving: boolean) => {
    setState({ isSaving, isError: false });
  }

  const setLoadingUser = (isLoadingUser: boolean) => {
    setState({ isLoadingUser, isError: false });
  }

  const setError = (err: any) => {
    setState({ errorMessage: getErrorMessage(err), isLoadingList: false, isSaving: false, isError: true });
  }

  const actions: Actions = useMemo(() => {
    return {
      /**
       * Get the information about the user
       */
      async getByUsername(username: string) {
        try {
          setLoadingUser(true);
          const user = await usersRepository.getByUsername(username);
          const { createdAt, updatedAt, __typename, ...otherProps } = user;
          setState({ user: otherProps, isLoadingUser: false });

          return user;
        } catch(err: any) {
          console.error(err);
          setError(err);
          throw new Error(err);
        }
      },

      /**
       * Create a new user
       */
      async create(input: Omit<CreateUserInput, 'username'>) {

        setSaving(true);

        try {
          const user = await usersRepository.create(input);

          // Add a new user to the top of the array
          setState({ users: [ user, ...state.users ], isSaving: false });

          return user;
        } catch(err: any) {
          console.error('create', err);
          setError(err);
          throw new Error(err);
        }
      },

      /**
       * Update properties of the user of a respective id
       */
      async save(username: string, input: Partial<User>) {

        setSaving(true);

        try {
          if (input.name) {
            input.initials = getInitials(input.name);
          }
          const { createdAt, updatedAt, __typename, ...userToSave } = input;

          let userResult: any;
          if (authUser?.username === username) {
            userResult = await saveUser(username, userToSave);
          } else {
            userResult = await usersRepository.save(username, userToSave);
          }

          // search for that user in the array and update that with the new updated object
          const newUsersState = state.users.map((user) => ((user.username === username) ? userResult : user));

          // if the current one is being edited then update that
          const currentUserState = (state.user?.username === userResult?.username) ? userResult : state.user;

          setState({ users: newUsersState, user: currentUserState, isSaving: false });

          return userResult;
        } catch(err: any) {
          console.error(err);
          setError(err);
          throw new Error(err);
        }
      },

      async delete(username: string) {

        setSaving(true);
        try {
          const deleted = await usersRepository.delete(username);

          // Remove the user from the array and update the state
          const newUsersState = state.users.filter(user => user.id !== username);

          // if the current one is being edited then update that
          const currentUserState = (state.user?.username === username) ? null : state.user;

          setState({ users: newUsersState, user: currentUserState, isSaving: false });

          return deleted;
        } catch(err: any) {
          console.error(err);
          setError(err);
          throw new Error(err);
        }
      },
    };
  }, [state]);

  useEffect(() => {
    if (options?.list === false) return; // only return if the list is explicity off
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Every time the initialUsername change it means we are loading a new user
  useEffect(() => {
    if (initialUsername) {
      (async () => {
        await actions.getByUsername(initialUsername);
      })();
    } else {
      setState({ user: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUsername]);

  return [state, actions];
};

export default useUser;
