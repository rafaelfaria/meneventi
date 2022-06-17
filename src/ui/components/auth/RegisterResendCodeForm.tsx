import { useForm } from "react-hook-form";
import useApp from "../../../hooks/useApp";
import ButtonWithSpinner from "../ButtonWithSpinner";
import TextField from "../forms/TextField";
import ButtonLink from "../ButtonLink";
import { Typography } from "@mui/material";

type FormData = {
  email: string;
}

type Props = {
  isLoading: boolean;
  onSubmit: () => void;
  onSuccess: (email: string, registeredEmail: string) => void;
  onError: (err: string) => void;
};

export default function RegisterResendCodeForm({ onSubmit, onSuccess, onError, isLoading }: Props) {
  const { authRepository } = useApp();
  const formActions = useForm<FormData>();

  /**
   * request cognito to re-send the verification code of the registration
   */
  const handleSubmitForm = async ({ email }: FormData) => {
    try {
      onSubmit();
      let registeredEmail = await authRepository.resendConfirmationCode(email);
      onSuccess(email, registeredEmail);
    } catch(err: any) {
      onError(err.message);
    }
  }

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)}>
      <Typography variant="subtitle2">Re-enviar código de verificação</Typography>

      <TextField type="email" label="Email" placeholder={"your@email.com"}
        {...formActions.register("email", { required: true })}
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      />

      <ButtonWithSpinner type="submit" variant="contained" fullWidth showSpinner={isLoading}>
          Re-enviar código
      </ButtonWithSpinner>

      <Typography sx={{ textAlign: 'center' }}>
        ou <ButtonLink to="/login">Logar</ButtonLink>
      </Typography>
    </form>
  );
}
