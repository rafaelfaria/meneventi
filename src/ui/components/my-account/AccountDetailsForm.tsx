import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactLoading from 'react-loading';
import { Box, Grid, Stack, Typography } from '@mui/material';
import ButtonWithSpinner from '../ButtonWithSpinner';
import { User } from '../../../lib/amplify/API';
import TextField from '../forms/TextField';
import { getErrorMessage } from '../../../lib/helpers';
import { State as UserState, Actions as UserActions } from '../../../hooks/useUsers';
import useToastNotification from '../../../hooks/useToastNotification';
import { getInitials } from '../../../lib/helpers/user';
import AccountPhoto from "./AccountPhoto";

type FormData = User;

type Props = {
  user?: User;
  isLoading?: boolean;
  state: UserState;
  actions: UserActions;
}

export default function AccountDetailsForm({ state, actions, user, isLoading }: Props) {

  const { isSaving, isError, errorMessage } = state;
  const { save: saveUser } = actions;
  const [ error, setError ] = useState<string | null>();
  const [ userInitials, setUserInitials ] = useState<string | undefined | null>(user?.initials);

  const { showSuccessNotification, showErrorNotification } = useToastNotification();

  /**
   * Listen to any errors coming from the state of the repository, and set the local message
   */
  useEffect(() => {
    if (isError) {
      setError(errorMessage);
    }
  }, [isError])

  /**
   * If there is any error show the error notification
   */
  useEffect(() => {
    if (error) {
      showErrorNotification(error);
    }
  }, [error])

  /**
   * Setup the default values of the form
   */
  const formActions = useForm<FormData>();

  /**
   * Every time the event object changes, we make sure the forms are clear and reset with all the new information
   */
  useEffect(() => {
    if (user) {
      formActions.reset(user);
      setUserInitials(user?.initials);
    }
  }, [user]);

  /**
   * Listen to any changes in the controlled forms
   */
  useEffect(() => {
    const subscription = formActions.watch((value: any, { name }) => {
      if (!name) return;

      if (name === "name") {
        const initials = getInitials(value.name);
        formActions.setValue('initials', initials);
        setUserInitials(initials);
      }

    });
    return () => subscription.unsubscribe();
  }, [formActions.watch]);

  /**
   * Handle the form when the user submits it
   */
  const handleSubmitForm = async (data: User) => {
    setError(null);

    try {
      if (user) {
        await saveUser(user.username, data);
      }
      showSuccessNotification('Usuário salvo com sucesso!');

    } catch(err: any) {
      console.error('User handleSubmitForm', err);
      setError(getErrorMessage(err));
    }
  }

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)} style={{ display: "block", padding: "10px" }}>
      <Grid container columnSpacing={2} sx={{ mt: 2 }}>
        {isLoading &&
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <ReactLoading type="bars" color="#d7e0e8" width={200} height={200}  />
              <Typography variant="h6" color="#c3c3c3">Loading...</Typography>
            </Box>
          </Grid>
        }

        {!isLoading &&
          <>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <AccountPhoto initials={userInitials} />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
                <Grid container columnSpacing={2}>
                  <Grid item xs={12}>
                    <TextField variant="filled" type="text" fullWidth sx={{ mb: 2 }}
                      label="Name"
                      name="name"
                      rules={{ required: true }}
                      control={formActions.control}
                      disabled={isSaving}
                    />
                  </Grid>
                </Grid>
            </Grid>


            <Grid item xs={12}>
              <Stack flexDirection="row" alignItems="center" justifyContent="center" sx={{ mt: 2 }} columnGap={2}>
                <ButtonWithSpinner type="submit" variant="contained" showSpinner={isSaving} sx={{ mt: 3, mb: 3 }} color="primary">
                  Save
                </ButtonWithSpinner>
              </Stack>
            </Grid>
          </>
        }

      </Grid>
    </form>
  );
}
