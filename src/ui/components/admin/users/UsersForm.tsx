import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ReactLoading from 'react-loading';
import { Box, Button, Grid, Stack, Typography, Avatar } from '@mui/material';
import ButtonWithSpinner from '../../ButtonWithSpinner';
import { User } from "../../../../lib/amplify/API";
import TextField from '../../forms/TextField';
import { getErrorMessage } from '../../../../lib/helpers';
import { State, Actions } from '../../../../hooks/useUsers';
import useAuth from '../../../../hooks/useAuth';
import useToastNotification from "../../../../hooks/useToastNotification";
import { getInitials } from "../../../../lib/helpers/user";
import useConfirm from "../../../../hooks/useConfirm";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

type FormData = User;

type Props = {
  user?: User;
  isLoading?: boolean;
  state: State;
  actions: Actions;
  onCancel?: () => void;
}

const initialDefault = {
  name: '',
  email: '',
  photo: '',
}

export default function UsersForm({ state, actions, user, isLoading, onCancel }: Props) {
  const { confirm } = useConfirm();
  const { authUser } = useAuth();
  const { isError, errorMessage } = state;
  const { create: createUser, save: saveUser, delete: deleteUser  } = actions;
  const [ error, setError ] = useState<string | null>();
  const [ isSaving, setIsSaving ] = useState<boolean>(false);


  const navigate = useNavigate();
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
   * Every time the analysis object changes, we make sure the forms are clear and reset with all the new information
   */
  useEffect(() => {
    if (user) {
      const { createdAt, updatedAt, ...details } = user;
      formActions.reset(details)
    } else {
      formActions.reset(initialDefault);
    }
  }, [user]);

  /**
   * Handle the deletion of an item
   */
  const handleDeleteUser = async () => {
    setError(null);
    if (user) {
      try {
        await confirm({ description: <Typography>Are you sure you want to delete <strong>{user.name} ({user.email})</strong></Typography>});
        try {
          await deleteUser(user?.username);
          showSuccessNotification(`User ${user?.name} deleted successfully!`);
          navigate(`/admin/users`);
        } catch(err: any) {
          console.log(err);
          setError(getErrorMessage(err));
        }
      } catch(err) {}
    }
  }


  /**
   * Save the form
   */
  const handleSubmitForm = async (data: User) => {

    try {
      setIsSaving(true);
      setError(null);
      const initials = getInitials(data.name);

      const formattedData = {
        ...data,
        initials
      }

      if (user) {
        await saveUser(user.username, formattedData);
        showSuccessNotification('Player saved successfully');
      } else {
        const resp = await createUser(formattedData);
        showSuccessNotification('Player created successfully!');
        if (onCancel) {
          onCancel();
        } else {
          navigate(`/admin/users/${resp?.username}`);
        }
      }
    } catch(err: any) {
      console.error('User handleSubmitForm', err);
      setError(getErrorMessage(err));
    }
    setIsSaving(false);

  }

  const handleOnCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      navigate('/admin/users')
    }
  }

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)} style={{ display: "block", padding: "10px" }}>
        <Grid container columnSpacing={2} sx={{ mt: 2 }}>
          {(isLoading) &&
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <ReactLoading type="bars" color="#d7e0e8" width={200} height={200}  />
                <Typography variant="h6" color="#c3c3c3">Loading...</Typography>
              </Box>
            </Grid>
          }

          {!isLoading &&
            <>
              {user ?
                <Grid item xs={12}>
                  <Stack flexDirection="row" alignItems="center" sx={{ mb: 3 }}>
                    <Avatar sx={{ mr: 1, width: 56, height: 56 }} src={user?.photo as string} alt={user?.name} />
                    <Stack flexDirection="column">
                      <Typography variant="body1">{user?.email}</Typography>
                      <Typography variant="body2" sx={{ color: '#CECECE'}}>{user?.username}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                : null
                // <Grid item xs={12}>
                //   <Title title={user ? 'Edit Player' : 'Add Player' } icon={UsersIcon} />
                // </Grid>
              }

              <Grid item xs={12}>
                <TextField variant="filled" type="text" fullWidth sx={{ mb: 2 }}
                  label="Name"
                  name="name"
                  rules={{ required: true }}
                  control={formActions.control}
                  disabled={isSaving}
                />
              </Grid>

              {!user &&
                <Grid item xs={12}>
                  <TextField variant="filled" type="text" fullWidth sx={{ mb: 2 }}
                    label="Email"
                    name="email"
                    rules={{ required: true }}
                    control={formActions.control}
                    disabled={isSaving}
                  />
                </Grid>
              }


              <Grid item xs={12}>
                <Stack flexDirection="row" alignItems="center" justifyContent="center" sx={{ mt: 3 }} columnGap={2}>
                  <Button variant="contained" color="neutral" onClick={handleOnCancel}>
                    <KeyboardArrowLeftIcon />
                    Return to list
                  </Button>
                  {user && authUser?.isSuperAdmin && authUser?.username !== user?.username &&
                    <ButtonWithSpinner variant="contained" onClick={handleDeleteUser} sx={{ mr: 1 }} color="neutral" disabled={isSaving}>
                      Delete User
                    </ButtonWithSpinner>
                  }

                  <ButtonWithSpinner type="submit" variant="contained" showSpinner={isSaving} sx={{ mt: 3, mb: 3 }}>
                    {user ? 'Save' : 'Create'}
                  </ButtonWithSpinner>
                </Stack>
              </Grid>
            </>
          }
        </Grid>
    </form>
  );
}
