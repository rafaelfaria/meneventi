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
      onError(err.message);
    }
	}

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Nós enviamos o código de verificaçào para o seu email {obfuscatedEmail} </Typography>

      <TextField type="text" label="Código de verificação"
        {...formActions.register("code", { required: true })}
        fullWidth
        sx={{ mb: 2 }}
      />

      <ButtonWithSpinner type="submit" variant="contained" fullWidth showSpinner={isLoading}>
        Confirmar cadastro
      </ButtonWithSpinner>

      <Typography sx={{ textAlign: 'center', mt: 2 }}>
        ou <Button color="primary" onClick={() => { resendCode()}}>Re-enviar código de verificação</Button>
      </Typography>

    </form>
  );
}
