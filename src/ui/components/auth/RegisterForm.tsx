import { Button, FormGroup, Grid, InputAdornment, Link, Modal, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import useApp from "../../../hooks/useApp";
import useLocalStorage from "../../../hooks/useLocalStorage";
import ButtonWithSpinner from '../ButtonWithSpinner';
import CheckBox from "../forms/CheckBox";
import TextField from '../forms/TextField';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import TermsAndConditions from "./TermsAndConditions";

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

  const [ openModal, setOpenModal ] = useState<boolean>(false);
  const [ , setRememberEmail ] = useLocalStorage('rememberEmail', '');
  const { authRepository } = useApp();
  const formActions = useForm<FormData>();
  const { errors } = formActions.formState; // Needs to do this in order to trigger the errors 🤷

  const handleSubmitForm = async (data: FormData) => {
    const { email, password, name, telegram, phoneNumber } = data;

    // Stringify the information that will be used afterwards during the login and creation of the user settings
    const zoneinfo = JSON.stringify({
      phoneNumber,
      telegram: (telegram || '').replace('@', '')
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

  const openTermsAndConditions = (e: any) => {
    e.preventDefault();
    setOpenModal(true);
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
            placeholder="seu@email.com"
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
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <FloatBox>
          <TermsAndConditions />
        </FloatBox>
      </Modal>

    </>
  );
}


const FloatBox = styled(Paper)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  padding: '15px',
  maxHeight: '480px',
  overflowY: 'auto'
}));

