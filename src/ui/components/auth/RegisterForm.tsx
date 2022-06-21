import { Button, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import useApp from "../../../hooks/useApp";
import useLocalStorage from "../../../hooks/useLocalStorage";
import ButtonWithSpinner from '../ButtonWithSpinner';
import TextField from '../forms/TextField';

type FormData = {
  email: string;
  password: string;
  name: string;
  telegram: string;
  phoneNumber: string;
  terms: boolean;
  newsletter: boolean;
}

type Props = {
  isLoading: boolean;
  onSubmit: () => void;
  onSuccess: (email: string, obfuscatedEmail: string) => void;
  onError: (err: string) => void;
  resendCode: () => void;
};

export default function RegisterForm({ onSubmit, onSuccess, onError, resendCode, isLoading }: Props) {

  const [ , setRememberEmail ] = useLocalStorage('rememberEmail', '');
  const { authRepository } = useApp();
  const formActions = useForm<FormData>();
  const { errors } = formActions.formState; // Needs to do this in order to trigger the errors 🤷

  const handleSubmitForm = async (data: FormData) => {
    const { email, password, name } = data;

    // Stringify the information that will be used afterwards during the login and creation of the user settings
    const zoneinfo = JSON.stringify({
      // phoneNumber,
      // telegram: (telegram || '').replace('@', '')
    });

    try {
      onSubmit();
      const obfuscatedEmail = await authRepository.register(email, password, { name, zoneinfo });
      setRememberEmail(email);
      onSuccess(email, obfuscatedEmail);
    } catch(err: any) {
      formActions.reset({ 'password': ''});
      onError(err.message);
    }
  }


  return (
    <>
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
           <TextField type="text" variant="outlined" control={formActions.control} fullWidth sx={{ mb: 2 }}
            name="name"
            label="Full Name"
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField type="email" variant="outlined" control={formActions.control} fullWidth sx={{ mb: 2 }}
            name="email"
            label="Email"
            placeholder="your@email.com"
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField type="password" variant="outlined" control={formActions.control} fullWidth sx={{ mb: 2 }}
            name="password"
            label="Password"
            rules={{ required: true }}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonWithSpinner type="submit" variant="contained" fullWidth showSpinner={isLoading}>
            Create account
          </ButtonWithSpinner>
        </Grid>

      </Grid>

    </form>
    <Typography color="#FFFFFF" sx={{ textAlign: 'center', mt: 2 }}>
      ou <Button color="primary" onClick={() => { resendCode()}}>Resend confirmation code</Button>
    </Typography>
    </>
  );
}