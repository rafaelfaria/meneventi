import { useForm } from "react-hook-form";
import useApp from "../../../hooks/useApp";
import ButtonWithSpinner from "../ButtonWithSpinner";
import TextField from "../forms/TextField";
import { Typography } from "@mui/material";
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { AuthUser } from "../../../lib/auth/types";

type FormData = {
  newPassword: string;
}

type Props = {
  isLoading: boolean;
  user?: CognitoUserInterface,
  onSubmit: () => void;
  onSuccess: (user: AuthUser) => void;
  onError: (err: string) => void;
};

export default function ChangeTemporaryPasswordForm({ onSubmit, onSuccess, onError, isLoading, user }: Props) {
  const { authRepository } = useApp();
  const formActions = useForm<FormData>();

	const handleSubmitForm = async ({ newPassword }: FormData) => {
    try {
      onSubmit()
      const loggedUser = await authRepository.completeNewPassword(user as CognitoUserInterface, newPassword);
      onSuccess(loggedUser);
    } catch(err: any) {
      onError(err.message);
    }
	}

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)}>
      <Typography color="#000000" variant="subtitle2">Bem vindo {user?.challengeParam?.userAttributes?.name} 👋.</Typography>
      <Typography color="#000000" variant="subtitle2" sx={{ mb: 2 }}> Como este é o seu primeiro login, você precisa mudar a sua senha.</Typography>

      <TextField type="password" label="Nova Senha"
        {...formActions.register("newPassword", { required: true })}
        fullWidth
        sx={{ mb: 2 }}
      />

      <ButtonWithSpinner type="submit" variant="contained" fullWidth showSpinner={isLoading}>
        Salvar nova senha
      </ButtonWithSpinner>

    </form>
  );
}
