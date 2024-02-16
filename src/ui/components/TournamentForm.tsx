import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import ReactLoading from 'react-loading';
import { Box, Button, Grid, Stack, Typography, IconButton, List, ListItem, InputAdornment, Divider } from '@mui/material';
import ButtonWithSpinner from './ButtonWithSpinner';
import { Tournament, User } from '../../lib/amplify/API';
import TextField from './forms/TextField';
import { State, Actions } from '../../hooks/useRepository';
import useToastNotification from "../../hooks/useToastNotification";
import useConfirm from '../../hooks/useConfirm';
import DeleteIcon from '@mui/icons-material/Delete';
import UserSearch from './forms/UserSearch';
import useUser from '../../hooks/useUsers';
import { getErrorMessage } from '../../lib/helpers';
import AddIcon from '@mui/icons-material/AddCircle';
import DatePicker from "./forms/DatePicker";

type FormData = Tournament;

type Props = {
  tournament?: Tournament;
  isLoading?: boolean;
  state: State;
  actions: Actions<Tournament>;
  onCancel?: () => void;
}

const defaultInitial = {
  name: '',
  date: (new Date()).toISOString(),
  leaderboard: [
    {
      place: 1,
      buyIn: 15,
      prize: 0
    }
  ]
}

export default function TournamentForm({ state, actions, tournament, isLoading, onCancel }: Props) {

  const [{ isLoadingList: isLoadingUsers, users }] = useUser();

  const { confirm } = useConfirm();
  const { isSaving, isError, errorMessage } = state;
  const { create: createTournament, save: saveTournament, delete: deleteTournament  } = actions;
  const [ error, setError ] = useState<string | null>();
  const navigate = useNavigate();
  const { showSuccessNotification, showErrorNotification } = useToastNotification();

  const [ totalBuyIn, setTotalBuyIn ] = useState<number>(0);
  const [ totalPrize, setTotalPrize ] = useState<number>(0);

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
  // console.log(formActions.formState.errors);

  // @ts-ignore
  const leaderboard = useWatch({ control: formActions.control, name: 'leaderboard' });
  // console.log({ leaderboard });

  const { fields: usersFields, append: appendUser, remove: removeUser } = useFieldArray<any>({
    control: formActions.control,
    name: "leaderboard",
  });

  /**
   * Every time the event object changes, we make sure the forms are clear and reset with all the new information
   */
  useEffect(() => {
    if (tournament) {
      const { createdAt, updatedAt, __typename, owner, ...tournamentDetails } = tournament;
      // @ts-ignore
      formActions.reset({ ...tournamentDetails, leaderboard: tournamentDetails.leaderboard || [{}] });
    } else {
      formActions.reset(defaultInitial);
    }
  }, [tournament]);

  /**
   * Listen to any changes in the controlled forms
   */
  useEffect(() => {
    const subscription = formActions.watch((value: any, { name }) => {

      let tBuyIn = 0; // total buyin
      let tPrize = 0; // total prize
      for (let i = 0; i < value.leaderboard?.length; i++) {
        tBuyIn += Number(value.leaderboard[i]?.buyIn || 0);
        tPrize += Number(value.leaderboard[i]?.prize || 0);
      }

      setTotalBuyIn(tBuyIn);
      setTotalPrize(tPrize);
    });
    return () => subscription.unsubscribe();

    // eslint-disable-next-line
  }, [formActions.watch]);

  /**
   * Handle the deletion of an item
   */
  const handleDeleteItem = async () => {
    setError(null);
    if (tournament) {
      try {
        await confirm({ description: <Typography>Are you sure you want to delete tournament <strong>{tournament?.name?.toUpperCase()}</strong></Typography>});
        try {
          await deleteTournament(tournament?.id);
          showSuccessNotification(`Tournament ${tournament?.name?.toUpperCase()} successfully deleted!`);
          navigate('/');
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

      const formattedData = {
        ...data,
        date: (new Date(data.date || new Date())).toISOString(),
        totalPrize: leaderboard?.reduce((acc, item) => acc + Number(item?.prize || 0), 0),
        leaderboard: leaderboard?.filter(item => item).map((item, index) => {
          delete (item as any).__typename;
          if (!item) return item;
          item.place = index + 1;
          return item;
        })
      }

      console.log({ formattedData });

      if (tournament) {
        await saveTournament(tournament.id, formattedData as Tournament);
        showSuccessNotification('Tournament saved successfully!');
      } else {
        await createTournament(formattedData as Tournament);
        showSuccessNotification('Tournament created successfully!');
        if (onCancel) {
          onCancel();
        } else {
          navigate('/');
        }
      }

    } catch(err: any) {
      console.error('Tournament handleSubmitForm', err);
      setError(getErrorMessage(err));
    }
  }

  const handleSelectUser = (index: number, user: User) => {
    // @ts-ignore
    formActions.setValue(`leaderboard.${index}.username`, user ? user.username : null);
    // @ts-ignore
    formActions.setValue(`leaderboard.${index}.name`, user ? user.name : null);
    // @ts-ignore
    formActions.setValue(`leaderboard.${index}.email`, user ? user.email : null);
    // @ts-ignore
    formActions.setValue(`leaderboard.${index}.initials`, user ? user.initials : null);
    formActions.setValue(`leaderboard.${index}.photo`, user ? user.photo : null);
  }

  const handleOnCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      navigate('/')
    }
  }

  const handleSetPrize = () => {
    const prizeSplit = prompt('Enter the prize(%) split by position(comma separated)', '70,30');
    if (prizeSplit) {
      const prizes = prizeSplit.split(',').map(Number);
      const totalPrize = prizes.reduce((acc, item) => acc + item, 0);
      if (totalPrize !== 100) {
        alert('The total prize split must be 100%');
        return;
      }

      for (let i = 0; i < prizes.length; i++) {
        formActions.setValue(`leaderboard.${i}.prize`, (prizes[i] * totalBuyIn) / 100);
      }

      // const newLeaderboard = leaderboard?.map((item, index) => {
      //   return {
      //     ...item,
      //     prize: (prizes[index] * totalBuyIn) / 100
      //   }
      // });

      // console.log({ newLeaderboard });
      // formActions.setValue('leaderboard', newLeaderboard);
    }
  }

  return (
    <form onSubmit={formActions.handleSubmit(handleSubmitForm)} style={{ display: "block", padding: "10px" }}>
      <Grid container columnSpacing={1}>
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
              <Typography variant="h6" sx={{ mb: 2 }}>Details</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField variant="filled" type="text" fullWidth sx={{ mb: 2 }}
                label="Tournament Name"
                name="name"
                rules={{ required: true }}
                control={formActions.control}
                disabled={isSaving}
                size="small"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField variant="filled" type="text" fullWidth sx={{ mb: 2 }}
                label="Buy In $"
                name="buyIn"
                rules={{ required: true }}
                control={formActions.control}
                disabled={isSaving}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                name="date"
                label="Data"
                inputFormat="dd/MM/yyyy"
                control={formActions.control}
                rules={{ required: true }}
                autoOk
                disabled={isSaving}
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: 4, mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" alignItems="center"  sx={{ mt: 2 }}>
                <Typography variant="h6">Players</Typography>
                <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                  <Button onClick={handleSetPrize}>Set the Prize</Button>
                </Box>
              </Stack>
            </Grid>



            <Grid item xs={12}>
              <List>
                {usersFields.map((item: any, index: number) => {
                  const showRemove = (usersFields.length > 1) || (index === 0 && usersFields.length > 1);
                  return (
                    <ListItem
                      sx={{ padding: 0, mb: 1 }}
                      key={item.username}
                      secondaryAction={
                      showRemove &&
                        <IconButton edge="end" onClick={() => removeUser(index)}>
                          <DeleteIcon />
                        </IconButton>
                      }>

                      <UserSearch
                        label="Player"
                        isLoading={isLoadingUsers}
                        options={users}
                        selectedItems={leaderboard}
                        onChange={(user: User) => handleSelectUser(index, user)}
                        selectedValue={(leaderboard && leaderboard[index]?.username) ? {
                          username: leaderboard[index]?.username,
                          name: leaderboard[index]?.name,
                          } : null}
                        placeholder="Find user..."
                        size="small"
                        InputProps={{
                          sx: { }
                        }}
                      />
                      <TextField variant="filled" type="text"
                        label="Buy in"
                        name={`leaderboard.${index}.buyIn`}
                        control={formActions.control}
                        disabled={isSaving}
                        size="small"
                        sx={{ ml: 1 }}
                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                      />

                      <TextField variant="filled" type="text"
                        label="Prize"
                        name={`leaderboard.${index}.prize`}
                        control={formActions.control}
                        disabled={isSaving}
                        size="small"
                        sx={{ ml: 1 }}
                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                      />

                    </ListItem>
                  )
                })}

                 <ListItem
                  sx={{ padding: 0, mb: 1 }}
                  >
                    <Box sx={{ display: 'flex', flexGrow: 1 }}></Box>

                    <TextField variant="filled" type="text"
                      label="Total Buy-In"
                      size="small"
                      value={totalBuyIn}
                      sx={{
                        ml: 1,
                        '.MuiInputLabel-root': {
                          color:'rgba(255, 255, 255, 0.7) !important',
                        },
                        '.MuiFilledInput-root': {
                          background: 'transparent',
                          '&:before': {
                            display: 'none'
                          },
                          '&:after': {
                             display: 'none'
                          }
                        }
                      }}
                      InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, readOnly: true }}
                    />

                    <TextField variant="filled" type="text"
                      label="Total Prize"
                      size="small"
                      value={totalPrize}
                      sx={{
                        ml: 1,
                        '.MuiInputLabel-root': {
                          color:'rgba(255, 255, 255, 0.7) !important',
                        },
                        '.MuiFilledInput-root': {
                          background: 'transparent',
                          '&:before': {
                            display: 'none'
                          },
                          '&:after': {
                             display: 'none'
                          }
                        }
                      }}
                      InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, readOnly: true }}
                    />

                  </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="right">
              <Button onClick={() => appendUser({ prize: 0, buyIn: 15 })} startIcon={<AddIcon />}>
                Add new user
              </Button>
            </Grid>


            <Grid item xs={12}>
              <Stack flexDirection="row" alignItems="center" justifyContent="center" sx={{ mt: 3 }} columnGap={2}>
                <Button variant="contained" color="neutral" onClick={handleOnCancel}>Home</Button>
                {tournament &&
                  <ButtonWithSpinner variant="contained" onClick={handleDeleteItem} sx={{ mr: 1 }} color="neutral" disabled={isSaving}>
                    Delete
                  </ButtonWithSpinner>
                }

                <ButtonWithSpinner type="submit" variant="contained" showSpinner={isSaving} sx={{ mt: 3, mb: 3 }}>
                  {tournament ? 'Save' : 'Create'}
                </ButtonWithSpinner>
              </Stack>
            </Grid>
          </>
        }

      </Grid>
    </form>
  );
}
