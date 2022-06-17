import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from 'query-string';
import AuthErrorAlert from "../../components/auth/AuthErrorAlert";
import { AuthBox, AuthTitle } from "../../components/auth";
import useAuth from "../../../hooks/useAuth";
import { getErrorMessage } from "../../../lib/helpers";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Page from "../Page";
import { AuthUser } from "../../../lib/auth/types";
import LoginForm from "../../components/auth/LoginForm";
import ChangeTemporaryPasswordForm from "../../components/auth/ChangeTemporaryPasswordForm";
import { CognitoUserInterface } from '@aws-amplify/ui-components';


export default function Login() {
  const navigate = useNavigate();

  const [ , setRememberEmail ] = useLocalStorage('login:rememberEmail', '');
  const [ isLoading, setLoading ] = useState<boolean>(false); // The isLoading status will be used for logging or saving the new password
  const [ step, setNextStep ] = useState<string>('login');
  const [ title, setTitle ] = useState<string>('Login');

  const { authUser, setAuthUser } = useAuth();
  const [ authError, setAuthError ] = useState<string>();
  const [ tempUser, setTempUser ] = useState<CognitoUserInterface>();

  /**
   * This useEffect will try to identify if the user is successfully logged in and then redirect to the right page
   */
  useEffect(() => {
    (async () => {
      if (authUser) {
        let { redirect = '/' }:any = queryString.parse(window.location.search);
        navigate(redirect, { state: { from: 'login' } });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  /**
   * General function for all the forms to be called after being submited
   * This will allow us to do some clean ups.
   */
  const onSubmit = (email?: string) => {
      if (email) {
        setRememberEmail(email);
      }

      setLoading(true);
      setAuthError('');
  }

  /**
   * General function if there is any erros in any of the forms.
   * This will allow us to set errors in the page
   */
  const onError = (error: any) => {
    if (error && error.challengeName &&  error.challengeName === "NEW_PASSWORD_REQUIRED") {
      return showChangeTempPassword(error);
    }

    setAuthError(getErrorMessage(error));
    setLoading(false);
  }

	/**
   * Call the step to show the temporary password
	 */
  const showChangeTempPassword = (user: CognitoUserInterface) => {
    setTempUser(user);
    setTitle('Change Password');
    setNextStep('temporary');
    setAuthError('');
    setLoading(false);
  }

	/**
   * Handle when the login has been successful
	 */
	const handleLoginSuccess = (user: AuthUser) => {
    setAuthUser(user);
    setAuthError('');
    setLoading(false);
	}

	/**
	 * This will decide what form to render based on the action of the user.
	 */
  const renderForm = () => {
    switch(step) {
      case 'temporary':
        return <ChangeTemporaryPasswordForm user={tempUser} isLoading={isLoading} onSubmit={onSubmit} onSuccess={handleLoginSuccess} onError={onError} />
      case 'login':
      default:
        return <LoginForm isLoading={isLoading} onSubmit={onSubmit} onSuccess={handleLoginSuccess} onError={onError} />
    }
  }


  return (
    <Page title="Login">
      <AuthBox>
        <AuthTitle>{title}</AuthTitle>
        <AuthErrorAlert message={authError} />
        {renderForm()}
      </AuthBox>
    </Page>
  );
}
