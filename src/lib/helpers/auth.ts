import { Auth } from "aws-amplify";

/**
 * Check if the user is logged in or not, we need to check this to make a decision if we are using
 * the cognito or IAM to fetch the data in the methods for this class
 */
export const isUserLoggedIn = async (): Promise<any> => {
  try {
      return await Auth.currentAuthenticatedUser();
  } catch {
      return false;
  }
}

/**
 * Check if the authenticated user is an admin
 */
export const isUserAdmin = async (): Promise<any> => {
  try {
    const user = await isUserLoggedIn();
    const userGroups = user.signInUserSession.accessToken.payload["cognito:groups"] || [];
    console.log({ userGroups });
    return userGroups.includes("Admin");
  } catch {
    return false;
  }
}
