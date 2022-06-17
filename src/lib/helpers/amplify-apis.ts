import { API, Auth } from "aws-amplify";

export const sendRequestGET = async (apiName: string, path: string, params?: any)  => {
  return sendRequest(apiName, 'get', path, { queryStringParameters: params });
}

export const sendRequestPOST = async(apiName: string, path: string, { body, queryStringParameters }: any) => {
  return sendRequest(apiName, 'post', path, { body, queryStringParameters });
}

/**
 * Interact with the payments API
 */
export const sendRequest = async (apiName: string, method: 'post' | 'get' = 'post', path: string, options?: any) => {
  try {
    let { body, queryStringParameters } = options;

    let myInit = {
        body,
        queryStringParameters,
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    return await API[method](apiName, path, myInit);
    } catch(err: any) {
      throw (err?.response?.data?.message || err);
    }
  }
