import  { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Observable } from 'zen-observable-ts';
import useAuth from './useAuth';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';

export type SubscriptionConfigType<VariableType extends {}> = {
	query: string;
	key: string;
	variables?: VariableType;
  authMode?: GRAPHQL_AUTH_MODE;
};

export const useSubscription = <ItemType, VariablesType extends {} = {}>({
	config,
	itemData,
}: {
	config?: SubscriptionConfigType<VariablesType>;
	itemData?: ItemType;
} = {}) => {

	const [item, update] = useState<ItemType | undefined>(itemData);
  const { authUser } = useAuth();

	useEffect(() => {
		let unsubscribe;

		if (config) {
			(async () => {
        try {
          let { query, key, variables, authMode = GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS } = config;
          let owner = (!authMode || authMode === GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS) ? authUser?.username : null;

          // @ts-ignore
          const subscription = API.graphql(graphqlOperation(query, { ...variables, ...(owner && { owner }), authMode })) as Observable<object>;

          const sub = subscription.subscribe({
            next: (payload: any) => {
              try {
                const {
                  value: {
                    data: { [key]: item },
                  },
                }: {
                  value: { data: { [key: string]: ItemType } };
                } = payload;

                update(item);
              } catch (error: any) {
                console.error(
                  `${error.message} - Check the key property: the current value is ${key}`
                );
              }
            },
            error: (err: any) => console.error("error caught", err),
          });

          unsubscribe = () => {
            sub.unsubscribe();
          };
        } catch (err: any) {
          console.log(err);
        }
			})();
		}
		return unsubscribe;
	}, [JSON.stringify(config)]);

	return [item];
};