import { useCallback, useState } from "react";
import { AuthBox, AuthTitle } from "../../components/auth";
import AuthErrorAlert from '../../components/auth/AuthErrorAlert';
import RegisterForm from "../../components/auth/RegisterForm";
import RegisterConfirmForm from "../../components/auth/RegisterConfirmForm";
import RegisterSuccess from "../../components/auth/RegisterSuccess";
import RegisterResendCodeForm from "../../components/auth/RegisterResendCodeForm";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Page from "../Page";

export default function Register() {
  const [ , setRememberEmail ] = useLocalStorage('rememberEmail', '');

  const [ authError, setAuthError ] = useState<string>();
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const [ userEmail, setUserEmail ] = useState<string>('');
  const [ obfuscatedEmail, setObfuscatedEmail ] = useState<string>('');
  const [ step, setNextStep ] = useState<string>('register');
  const [ title, setTitle ] = useState<string>('Sign Up');

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
  }, [setAuthError, setLoading]);

	/**
	 * This method is called in 2 occasions, either when the registration form is a success
   * or when the resend verification code is a success. It will then set the appropriate title
   * go to the next step which is to confirm the code, and clean up
	 */
	const handleRegistrationOrResendSuccess = useCallback((email: string, authEmail: string) => {
    setTitle('Confirm Sign Up');
    setUserEmail(email);
    setObfuscatedEmail(authEmail); // this will be obfuscated.  Ex: r***@g***.com
    setNextStep('confirm');
    setAuthError('');
    setLoading(false);
	}, [setTitle, setNextStep, setUserEmail, setObfuscatedEmail, setAuthError, setLoading]);

	/**
	 * This method is called after the confirmation of the verification code is successful.
	 */
	const handleConfirmationSuccess = useCallback(() => {
    setTitle('Success');
    setNextStep('confirmed');
    setAuthError('');
    setLoading(false);
    setRememberEmail('');
	}, [setTitle, setNextStep, setAuthError, setLoading]);

	/**
	 * This method is related to the link in some of the pages that takes the user
   * to the resend verification page
	 */
  const resendCode = useCallback(() => {
    setTitle('Resend Code');
    setNextStep('resend');
    setAuthError('');
  }, [setTitle, setNextStep]);

	/**
	 * This will decide what form to render based on the action of the user.
   * The main reason why we are doing this way and not showing each form with different urls
   * are for security reasons. Showing/Hiding these forms will avoid any attemp of hacking
   * the username or code of users
	 */
  const renderForm = useCallback(() => {
    switch(step) {
      case 'resend':
        return <RegisterResendCodeForm isLoading={isLoading} onSubmit={onSubmit} onSuccess={handleRegistrationOrResendSuccess} onError={onError} />
      case 'confirm':
        return <RegisterConfirmForm isLoading={isLoading} userEmail={userEmail} obfuscatedEmail={obfuscatedEmail} onSubmit={onSubmit} onSuccess={handleConfirmationSuccess} onError={onError} resendCode={resendCode} />
      case 'confirmed':
        return <RegisterSuccess />
      default:
        return <RegisterForm isLoading={isLoading} onSubmit={onSubmit} onSuccess={handleRegistrationOrResendSuccess} onError={onError} resendCode={resendCode} />
    }
  }, [step, userEmail, obfuscatedEmail, isLoading, onSubmit, handleRegistrationOrResendSuccess, handleConfirmationSuccess, resendCode, onError])


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
