import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonWithSpinner from "../ButtonWithSpinner";
import { getErrorMessage } from "../../../lib/helpers";
import { useLocation} from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
import { Grid, Stack } from '@mui/material';
import TextField from "../forms/TextField";
import useToastNotification from "../../../hooks/useToastNotification";


type FormData = {
  oldPassword: string;
  newPassword: string;
}

export default function AccountChangePasswordForm() {
  const { changePassword } = useAuth();

  const [ isSaving, setIsSaving ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>();
  const { pathname } = useLocation();
  const { showSuccessNotification, showErrorNotification } = useToastNotification();

  /**
   * If there is any error show the error notification
   */
  useEffect(() => {
    if (error) {
      showErrorNotification(error);
    }
  }, [error])

  /**
   * Initialise the useForm hook with default values
   */
  const formActions = useForm<FormData>();

  /**
   * Handle the form when the user submits it
   */
  const handleSubmitForm = async ({ oldPassword, newPassword }: FormData) => {
    try {
      setError(null);
      setIsSaving(true);
      await changePassword(oldPassword, newPassword);
      setIsSaving(false);
      showSuccessNotification('Senha alterada com sucesso!');
    } catch(err: any) {
      setIsSaving(false);
      setError(getErrorMessage(err));
    }

    resetForm();
  }

  /**
   * In case the user have left anything in the forms, when changing path, clear it out
   */
  useEffect(() => {
    resetForm();
    setError(null);
  }, [pathname]);

  /**
   * Reset the values of the form
   */
  const resetForm = () => formActions.reset({ oldPassword: '', newPassword: '' });


  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)} style={{ display: "block", padding: '10px' }}>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <TextField variant="filled" type="password" fullWidth sx={{ mb: 2 }}
            label="Old Password"
            name="oldPassword"
            rules={{ required: true}}
            control={formActions.control}
            disabled={isSaving}
          />
        </Grid>
        <Grid item xs={12}>
            <TextField variant="filled" type="password" fullWidth sx={{ mb: 2 }}
              label="New Password"
              name="newPassword"
              rules={{ required: true}}
              control={formActions.control}
              disabled={isSaving}
            />
        </Grid>
        <Grid item xs={12}>
          <Stack flexDirection="row" alignItems="center" justifyContent="center" sx={{ mt: 3 }} columnGap={2}>
            <ButtonWithSpinner type="submit" variant="contained" showSpinner={isSaving} sx={{ mt: 3, mb: 3 }}>
              Save Password
            </ButtonWithSpinner>
          </Stack>
        </Grid>
      </Grid>
  </form>
  );
}