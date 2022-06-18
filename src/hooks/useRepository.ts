import { useMemo, useEffect, useReducer, Reducer } from "react";
import { SubscriptionConfigType } from "../lib/factories/types";
import { getErrorMessage } from "../lib/helpers";
import { useSubscription } from "./useSubscription";

export type RepoListParams = {
  limit?: number
  filter?: any
  nextToken?: string | null
}

export type Repository<Item> = {
  getById: (itemId: string) => Promise<Item>;
  list: (params?: RepoListParams, results?: Item[]) => Promise<Item[]>;
  create: (item: Item) => Promise<Item>;
  delete: (itemId: string) => Promise<Item>;
  save: (itemId: string, input: Partial<Item>) => void;
};

export type State = {
  items: any[];
  item?: any;
  isError: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  isLoadingList: boolean;
  isLoadingItem: boolean;
  errorMessage?: string;
};

export type Actions<Item> = {
  getById: (itemId: string) => Promise<Item>;
  create: (item: Item) => Promise<Item>;
  save: (itemId: string, input: Partial<Item>) => void;
  delete: (itemId: string) => Promise<Item>;
  deleteBulk: (itemIds: string[]) => Promise<Item[]>;
  list: (options?: ListOptions) => Promise<Item[]>;
  clearItem: () => void;
}

const defaultState: State = {
  items: [],
  isLoadingList: false,
  isLoadingItem: false,
  isError: false,
  isSaving: false,
  isDeleting: false
}


type Options = {
  listOptions?: ListOptions,
  initialId?: string | null
  subscribeOnUpdate?: SubscriptionConfigType,
  subscribeOnCreate?: SubscriptionConfigType,
  subscribeOnDelete?: SubscriptionConfigType,
}

type ListOptions = {
  fetch?: boolean,
  filter?: any,
  updateListState?: boolean,
  isRefreshing?: boolean
}

const useRepository = <Item>(repository: Repository<Item>, options?: Options): [State, Actions<Item>] => {
  const { listOptions, initialId, subscribeOnCreate, subscribeOnUpdate, subscribeOnDelete } = options || {};

  // Use reducer to keep the state of data
  const [state, setState] = useReducer<Reducer<State, Partial<State>>>(
    (state, newState) => ({...state, ...newState}),
    {
      ...defaultState,
      isLoadingItem: Boolean(initialId) // This starts the isLoadingItem as true when is expected to load the item
    }
  );

  const [ createdItem ] = useSubscription<Item>({ config: subscribeOnCreate?.config});
  const [ updatedItem ] = useSubscription<Item>({ config: subscribeOnUpdate?.config});
  const [ deletedItem ] = useSubscription<Item>({ config: subscribeOnDelete?.config});

  useEffect(() => {
    if (createdItem) {
      // @ts-ignore
      const existCreateItem = state.items.find((item) => item[subscribeOnCreate?.idProp || 'id'] ===  createdItem[subscribeOnCreate?.idProp || 'id']);
      // If the user doesn't have the create item, then add it to the items
      if(!existCreateItem) {
        setState({ items: [ createdItem, ...state.items ] });
      }
    }

    if (updatedItem) {
      // @ts-ignore
      const newItemsState = state.items.map((item) => ((item[subscribeOnUpdate?.idProp || 'id'] === updatedItem[subscribeOnUpdate?.idProp || 'id']) ? updatedItem : item));
      setState({ items: newItemsState });
    }

    if (deletedItem) {
      // @ts-ignore
      const newItemsState = state.items.filter(item => item[subscribeOnDelete?.idProp || 'id'] !== deletedItem[subscribeOnDelete?.idProp || 'id']);
      setState({ items: newItemsState });
    }
  }, [updatedItem, createdItem, deletedItem])


  /**
   * Set loading/saving/error state
   */
  const setSaving = (isSaving: boolean) => {
    setState({ isSaving, isError: false });
  }

  const setDeleting = (isDeleting: boolean) => {
    setState({ isDeleting, isError: false });
  }

  const setLoadingItem = (isLoadingItem: boolean) => {
    setState({ isLoadingItem, isError: false });
  }

  const setError = (err: any) => {
    setState({ errorMessage: getErrorMessage(err), isLoadingList: false, isSaving: false, isDeleting: false, isError: true });
  }

  const actions: Actions<Item> = useMemo(() => {
    return {

      /**
       * Get the information about the item
       */
      async getById(itemId: string) {
        try {
          setLoadingItem(true);
          const item = await repository.getById(itemId);
          setState({ item, isLoadingItem: false });

          return item;
        } catch(err: any) {
          console.error(err);
          setError(err);
          throw err;
        }
      },

      /**
       * Create a new item
       */
      async create(input: Item) {
        setSaving(true);

        try {
          const item = await repository.create(input);

          // Add a new item to the top of the array
          setState({ items: [ item, ...state.items ], isSaving: false });

          return item;
        } catch(err: any) {
          console.error(err);
          setError(err);
          throw err;
        }
      },

      /**
       * Update properties of the item of a respective id
       */
      async save(itemId: string, input: Partial<Item>) {
        setSaving(true);

        try {
          const itemResult = await repository.save(itemId, input);

          // search for that item in the array and update that with the new updated object
          const newItemsState = state.items.map((item) => ((item.id === itemId) ? itemResult : item));
          setState({ items: newItemsState, isSaving: false });

          return itemResult;
        } catch(err: any) {
          console.error(err);
          setError(err);
          throw err;
        }
      },

      async delete(itemId: string) {

        setDeleting(true);
        try {
          const itemDeleted = await repository.delete(itemId);

          // Remove the item from the array and update the state
          const newItemsState = state.items.filter(item => item.id !== itemId);
          setState({ items: newItemsState, isDeleting: false });

          return itemDeleted;
        } catch(err: any) {
          console.error(err);
          setError(err);
          throw err;
        }
      },

      async deleteBulk(itemIds: string[]) {

        setDeleting(true);
        try {
          let newItemsState = [ ...state.items ];
          let updatedItems = [];

          for (let itemId of itemIds) {
            let resp = await repository.delete(itemId);
            updatedItems.push(resp);
            newItemsState = newItemsState.filter(item => item.id !== itemId);
          }

          // Remove the item from the array and update the state
          setState({ items: newItemsState, isDeleting: false });

          return updatedItems;
        } catch(err: any) {
          console.error(err);
          setError(err);
          throw err;
        }
      },

      clearItem() {
        setState({ item: null });
      },

      async list(options?: ListOptions) {
        try {
          setState({ isLoadingList: options?.isRefreshing ? false : true, isError: false, isSaving: false })
          const items = await repository.list({ filter: options?.filter });

          if (options?.updateListState === false) {
            setState({ isLoadingList: false });
          } else {
            setState({ items, isLoadingList: false });
          }

          return items;
        } catch (err: any) {
          console.log(err);
          setState({ isLoadingList: false });
          return [];
        }
      }
    };
  }, [state, repository]);

  useEffect(() => {
    if (listOptions?.fetch === false) return; // only return if the list is explicity off
    (async () => {
      await actions.list(listOptions);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Every time the initialId change it means we are loading a new item
  useEffect(() => {
    if (initialId) {
      (async () => {
        await actions.getById(initialId);
      })();
    } else {
      setState({ item: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  return [state, actions];
};

export default useRepository;
