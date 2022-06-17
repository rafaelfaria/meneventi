import { useForm } from "react-hook-form";
import useApp from "../../../hooks/useApp";
import ButtonWithSpinner from "../ButtonWithSpinner";
import TextField from "../forms/TextField";
import { Typography } from "@mui/material";
import ButtonLink from "../ButtonLink";

type FormData = {
  code: string
  password: string;
}

type Props = {
  isLoading: boolean;
  userEmail: string;
  obfuscatedEmail: string;
  onSubmit: () => void;
  onSuccess: () => void;
  onError: (err: string) => void;
};

export default function ResetPasswordNewForm({ onSubmit, onSuccess, onError, isLoading, userEmail, obfuscatedEmail }: Props) {
  const { authRepository } = useApp();
  const formActions = useForm<FormData>();

	const handleSubmitForm = async ({ code, password }: FormData) => {
    try {
      onSubmit()
      await authRepository.setNewPassword(userEmail, code, password);
      onSuccess();
    } catch(err: any) {
      onError(err.message);
    }
	}

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)}>
      <Typography variant="subtitle2">Nós enviamos um código de confirmação para o seu email {obfuscatedEmail}. Entre o código e a nova senha abaixo</Typography>

      <TextField type="text" label="Código"
        {...formActions.register("code", { required: true })}
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      />

      <TextField type="password" label="Nova Senha"
        {...formActions.register("password", { required: true })}
        fullWidth
        sx={{ mb: 2 }}
      />

      <ButtonWithSpinner type="submit" variant="contained" fullWidth showSpinner={isLoading}>
        Salvar nova senha
      </ButtonWithSpinner>

      <Typography sx={{ textAlign: 'center' }}>
        ou <ButtonLink to="/login">Logar</ButtonLink>
      </Typography>
    </form>
  );
}
