import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import useApp from "../../../hooks/useApp";
import ButtonWithSpinner from '../ButtonWithSpinner';
import TextField from '../forms/TextField';

type FormData = {
  code: string;
}

type Props = {
  userEmail: string;
  obfuscatedEmail: string;
  isLoading: boolean;
  onSubmit: () => void;
  onSuccess: () => void;
  onError: (err: string) => void;
  resendCode: () => void;
};

export default function RegisterConfirmForm({ userEmail, obfuscatedEmail, onSubmit, onSuccess, onError, resendCode, isLoading }: Props) {
  const { authRepository } = useApp();
  const formActions = useForm<FormData>();

	const handleSubmitForm = async ({ code }: FormData) => {
    try {
      onSubmit();
      await authRepository.confirmRegistration(userEmail, code);
      onSuccess();
    } catch(err: any) {
      console.error('RegisterConfirmForm: handleSubmitForm', err);
      onError(err.message);
    }
	}

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>We sent you a verification code to your email {obfuscatedEmail} </Typography>

      <TextField type="text" label="Verification Code"
        {...formActions.register("code", { required: true })}
        fullWidth
        sx={{ mb: 2 }}
      />

      <ButtonWithSpinner type="submit" variant="contained" fullWidth showSpinner={isLoading}>
        Confirm
      </ButtonWithSpinner>

      <Typography sx={{ textAlign: 'center', mt: 2 }}>
        or <Button color="primary" onClick={() => { resendCode()}}>Resend the verification code</Button>
      </Typography>

    </form>
  );
}
