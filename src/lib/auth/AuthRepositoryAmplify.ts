import { API, Auth, graphqlOperation } from "aws-amplify";
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { User, UserStatus } from "../amplify/API";
import { createUser } from "../amplify/graphql/mutations";
import { getErrorMessage } from "../helpers";
import { getInitials } from "../helpers/user";
import { AuthRepositoryInterface, RegisterAttributes, AuthUser } from "./types";
import UsersRepositoryAmplify from "../users/UsersRepositoryAmplify";
import { CreateUserResult } from "../users/types";

export default class AuthRepositoryAmplify implements AuthRepositoryInterface {

  private userRepository;

  constructor() {
    this.userRepository = new UsersRepositoryAmplify();
  }

  /**
   * Get the current logged user and construct the User object with the groups and settings
   */
  async getCurrent() {
    try {
      const authUser = await Auth.currentAuthenticatedUser(
       /*{ bypassCache: true }*/ // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      );
      const userGroups = authUser.signInUserSession.accessToken.payload["cognito:groups"] || [];
      const user = await this.userRepository.getByUsername(authUser.attributes.sub);

      if (!user) {
        throw new Error('Usuário inválido');
      }

      return {
        ...user,
        username: authUser.username,
        email: authUser.attributes.email,
        userGroups,
        isAdmin: userGroups.includes("Admin"),
        isSuperAdmin: userGroups.includes("Admin"),
        isEmailVerified: authUser.attributes.email_verified,
        userPoolId: authUser.pool.userPoolId,
      } as AuthUser;

    } catch(err: any) {
      console.warn('getCurrent', { err });
      this.logOut();
      throw err;
    }
  }

  /**
   * Sign In method, will check the user and password and create the user settings if needed
   */
  async signIn(email: string, password: string) {
    try {
      const authUser = await Auth.signIn(email, password);
      if (authUser.challengeName === "NEW_PASSWORD_REQUIRED") {
        throw authUser;
      }

      const username = authUser.attributes.sub;
      const userGroups = authUser.signInUserSession.accessToken.payload["cognito:groups"] || [];

      let user;
       try {
        // Get the user settings
        user = await this.userRepository.getByUsername(authUser.attributes.sub);

        // If the user settings doesn't existe then create it
        if (!user) {

          let extraParams = {};
          try {
            extraParams = JSON.parse(authUser.attributes.zoneinfo)
          } catch(err) {
            console.log('Não foi possível pegar as informações extras dos usuários');
          }

          const userResponse = await API.graphql(
            graphqlOperation(createUser, {
              input: {
                username,
                name: authUser.attributes.name,
                email: authUser.attributes.email,
                initials: getInitials(authUser.attributes.name),
                status: UserStatus.ACTIVE,
                ...extraParams
              }
            })
          ) as CreateUserResult;

          user = userResponse.data?.createUser as User;
        } else {
          await this.userRepository.save(username, {
            status: UserStatus.ACTIVE,
          });
        }

       } catch (err) {
          console.log('signIn - Settings', err);
          this.logOut();
          throw new Error(getErrorMessage(err));
       }

      return {
        ...user,
        userGroups,
        isAdmin: userGroups.includes("Admin"),
        isSuperAdmin: userGroups.includes("Admin"),
        isEmailVerified: authUser.attributes.email_verified,
        userPoolId: authUser.pool.userPoolId,
      };
    } catch(err: any) {
      console.log('signIn', err);
      this.logOut();
      if (err.name === 'QuotaExceededError') {
        window.localStorage.clear();
      }
      throw err;
    }
  }


  async completeNewPassword(user: CognitoUserInterface, newPassword: string) {
    const authUser = await Auth.completeNewPassword(user, newPassword);
    return this.signIn(authUser.challengeParam.userAttributes.email, newPassword);
  }

  async register(email: string, password: string, attributes: RegisterAttributes) {
    const response = await Auth.signUp({ username: email, password, attributes, clientMetadata: { group: 'Free' } });
    // the "Destination" is a obfuscated email of the user requested a confirmation code. Ex: r***@g***.com
    return response.codeDeliveryDetails.Destination;
  }

  async confirmRegistration(email: string, code: string) {
    await Auth.confirmSignUp(email, code);
    return true;
  }

  async resendConfirmationCode(email: string) {
    const response = await Auth.resendSignUp(email);
    // the "Destination" is a obfuscated email of the user requested a confirmation code. Ex: r***@g***.com
    return response.CodeDeliveryDetails.Destination;
  }

  async resetPassword(email: string) {
    const response = await Auth.forgotPassword(email);
    // the "Destination" is a obfuscated email of the user requested a confirmation code. Ex: r***@g***.com
    return response.CodeDeliveryDetails.Destination;
  }

  async setNewPassword(email: string, code: string, newPassword: string) {
    await Auth.forgotPasswordSubmit(email, code, newPassword);
    return true;
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const authUser = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(authUser, oldPassword, newPassword);
    return true;
  }

  async logOut() {
    await Auth.signOut({ global: true });
    return true;
  }
}
