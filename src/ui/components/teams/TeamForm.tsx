import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from "react-hook-form";
import ReactLoading from 'react-loading';
import { Box, Container, Button, Grid, Stack, Typography, IconButton, CircularProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import ButtonWithSpinner from '../ButtonWithSpinner';
import { Team, User } from "../../../lib/amplify/API";
import TextField from '../forms/TextField';
import { State, Actions } from '../../../hooks/useRepository';
import useToastNotification from "../../../hooks/useToastNotification";
import useConfirm from "../../../hooks/useConfirm";
import DeleteIcon from '@mui/icons-material/Delete';
import UserSearch from "../forms/UserSearch";
import useUser from "../../../hooks/useUsers";
import { getErrorMessage } from "../../../lib/helpers";

type FormData = Team;

type Props = {
  team?: Team;
  isLoading?: boolean;
  state: State;
  actions: Actions<Team>;
  onCancel?: () => void;
}

const defaultInitial = {
  name: ''
}

export default function TeamForm({ state, actions, team, isLoading, onCancel }: Props) {

  const [{ isLoadingList: isLoadingUsers, users }] = useUser();

  const { confirm } = useConfirm();
  const { isSaving, isError, errorMessage } = state;
  const { create: createTeam, save: saveTeam, delete: deleteTeam  } = actions;
  const [ error, setError ] = useState<string | null>();
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

  const { fields: usersFields, append: appendUser, remove: removeUser } = useFieldArray<any>({
    control: formActions.control,
    name: "users",
  });

  /**
   * Every time the event object changes, we make sure the forms are clear and reset with all the new information
   */
  useEffect(() => {
    if (team) {
      const { createdAt, updatedAt, __typename, owner,tournament, ...teamDetails } = team;
      // @ts-ignore
      formActions.reset({ ...teamDetails, users: teamDetails.users || [] });
    } else {
      formActions.reset(defaultInitial);
    }
  }, [team]);


  /**
   * Handle the deletion of an item
   */
  const handleDeleteTeam = async () => {
    setError(null);
    if (team) {
      try {
        await confirm({ description: <Typography>Are you sure you want to delete team <strong>{team?.name?.toUpperCase()}</strong></Typography>});
        try {
          await deleteTeam(team?.id);
          showSuccessNotification(`Team ${team?.name?.toUpperCase()} successfully deleted!`);
          navigate('/teams');
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
  const handleSubmitForm = async (data: FormData) => {

    try {
      setError(null);

      if (team) {
        await saveTeam(team.id, data as Team);
        showSuccessNotification('Team saved successfully!');
      } else {
        const resp = await createTeam(data as Team);
        showSuccessNotification('Team created successfully!');
        navigate(`/teams/${resp?.id}`);
      }

    } catch(err: any) {
      console.error('Team handleSubmitForm', err);
      setError(getErrorMessage(err));
    }
  }

  const handleSelectUser = ({ username, name, photo, initials, email }: User) => {
    appendUser({
      name,
      username,
      email,
      initials,
      photo
    });
  }

  const handleOnCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      navigate('/teams')
    }
  }

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)} style={{ display: "block", padding: "10px" }}>
      <Container maxWidth="lg">
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
              <Grid item xs={12}>
                <TextField variant="filled" type="text" fullWidth sx={{ mb: 2 }}
                  label="Team Name"
                  name="name"
                  rules={{ required: true }}
                  control={formActions.control}
                  disabled={isSaving}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ my: 2 }}>
                  {isLoadingUsers ?
                    <CircularProgress /> :
                    <UserSearch label="Usuários" options={users} selectedItems={usersFields} onChange={handleSelectUser} placeholder="Find user..." />
                  }
                </Box>


                <List>
                  {usersFields.map((item: any, index) => {
                    return (
                      <ListItem
                      key={item.username}
                      secondaryAction={
                          <IconButton edge="end" onClick={() => removeUser(index)}>
                            <DeleteIcon />
                          </IconButton>
                        }>
                        <ListItemAvatar>
                          <Avatar src={item.photo as string} alt={item.name}>{item.initials}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.name} secondary={item.email} />
                      </ListItem>
                    )
                  })}
                </List>
              </Grid>


              <Grid item xs={12}>
                <Stack flexDirection="row" alignItems="center" justifyContent="center" sx={{ mt: 3 }} columnGap={2}>
                  <Button variant="contained" color="neutral" onClick={handleOnCancel}>Cancel</Button>
                  <ButtonWithSpinner type="submit" variant="contained" showSpinner={isSaving} sx={{ mt: 3, mb: 3 }}>
                    {team ? 'Save' : 'Create'}
                  </ButtonWithSpinner>
                </Stack>
              </Grid>
            </>
          }

        </Grid>
      </Container>
    </form>
  );
}
