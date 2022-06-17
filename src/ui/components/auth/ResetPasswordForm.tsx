import { useForm } from "react-hook-form";
import useApp from "../../../hooks/useApp";
import ButtonWithSpinner from '../ButtonWithSpinner';
import TextField from '../forms/TextField';
import ButtonLink from "../ButtonLink";
import { Typography } from "@mui/material";

type FormData = {
  email: string;
}

type Props = {
  isLoading: boolean;
  onSubmit: () => void;
  onSuccess: (email: string, obfuscatedEmail: string) => void;
  onError: (err: string) => void;
};

export default function ResetPasswordForm({ onSubmit, onSuccess, onError, isLoading }: Props) {

  const { authRepository } = useApp();
  const formActions = useForm<FormData>();

	const handleSubmitForm = async ({ email }: FormData) => {
    try {
      onSubmit();
      const obfuscatedEmail = await authRepository.resetPassword(email);
      onSuccess(email, obfuscatedEmail);
    } catch(err: any) {
      onError(err.message);
    }
	}

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)}>
      <Typography variant="subtitle2">Digite o seu email abaixo para nós enviarmos um código de verificação para você poder então proceder em criar uma nova senha.</Typography>

      <TextField type="email" label="Email" placeholder={"your@email.com"}
        {...formActions.register("email", { required: true })}
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      />

      <ButtonWithSpinner type="submit" variant="contained" fullWidth showSpinner={isLoading}>
         Criar nova senha
      </ButtonWithSpinner>

      <Typography sx={{ textAlign: 'center', mt: 2 }}>
        ou <ButtonLink to="/login">Logar</ButtonLink>
      </Typography>
    </form>
  );
}
