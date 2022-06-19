import { useState, useCallback } from "react";
import { AuthBox, AuthTitle } from "../../components/auth";
import AuthErrorAlert from '../../components/auth/AuthErrorAlert';
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import ResetPasswordNewForm from "../../components/auth/ResetPasswordNewForm";
import ResetPasswordSuccess from "../../components/auth/ResetPasswordSuccess";
import Page from "../Page";


export default function ResetPassword() {

  const [ authError, setAuthError ] = useState<string>();
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const [ userEmail, setUserEmail ] = useState<string>('');
  const [ obfuscatedEmail, setObfuscatedEmail ] = useState<string>('');
  const [ step, setNextStep ] = useState<string>('reset');
  const [ title, setTitle ] = useState<string>('Forgot your password?');

	/**
	 * General function for all the forms to be called after being submited
   * This will allow us to do some clean ups.
	 */
  const onSubmit = useCallback(() => {
      setLoading(true);
      setAuthError('');
  }, [setLoading]);

	/**
	 * General function if there is any erros in any of the forms.
   * This will allow us to set errors in the page
	 */
  const onError = useCallback((error: string) => {
      setAuthError(error);
      setLoading(false);
  }, [setAuthError,setLoading]);

	/**
   *
	 */
	const handleResetSuccess = useCallback((email: string, obfuscatedEmail: string) => {
    setTitle('Create New Password');
    setUserEmail(email);
    setObfuscatedEmail(obfuscatedEmail); // this will be obfuscated.  Ex: r***@g***.com
    setNextStep('new');
    setAuthError('');
    setLoading(false);
	}, [setTitle, setNextStep, setUserEmail, setObfuscatedEmail, setAuthError, setLoading]);

	/**
	 *
	 */
	const handleNewPasswordSuccess = useCallback(() => {
    setTitle('Success');
    setNextStep('success');
    setAuthError('');
    setLoading(false);
	}, [setTitle, setNextStep, setAuthError, setLoading]);


	/**
	 * This will decide what form to render based on the action of the user.
	 */
  const renderForm = useCallback(() => {
    switch(step) {
      case 'new':
        return <ResetPasswordNewForm isLoading={isLoading} onSubmit={onSubmit} onSuccess={handleNewPasswordSuccess} onError={onError} userEmail={userEmail} obfuscatedEmail={obfuscatedEmail} />
      case 'temporary':
        return <ResetPasswordNewForm isLoading={isLoading} onSubmit={onSubmit} onSuccess={handleNewPasswordSuccess} onError={onError} userEmail={userEmail} obfuscatedEmail={obfuscatedEmail} />
      case 'success':
        return <ResetPasswordSuccess />
      default:
        return <ResetPasswordForm isLoading={isLoading} onSubmit={onSubmit} onSuccess={handleResetSuccess} onError={onError} />
    }
  }, [step, userEmail, obfuscatedEmail, isLoading, onSubmit, handleResetSuccess, handleNewPasswordSuccess, onError])


  return (
    <Page title={title}>
      <AuthBox>
        <AuthTitle>{title}</AuthTitle>
        <AuthErrorAlert message={authError} />
        {renderForm()}
      </AuthBox>
    </Page>
  );
}
