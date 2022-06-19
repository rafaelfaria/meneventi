import UsersIcon from '@mui/icons-material/People';
import Grid from '@mui/material/Grid';
import Page from "../Page";
import DataList from "../../components/table/DataList";
import Title from "../../components/Title";
import useUser from '../../../hooks/useUsers';
import columnData from '../../components/admin/users/ColumnData';
import { Avatar, Box, Button, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function AdminUsers() {

  const [ state, actions ] = useUser();
  const navigate = useNavigate();

  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  return (
    <Page title="Admin | Users">
      <Grid container spacing={0} columnSpacing={4}>
        <Grid item xs={12} md={12}>
          <Stack flexDirection="row">
            <Title title="Users" icon={UsersIcon} link="/admin/users" />
            <Box display="flex" flexGrow={1} width="100%" justifyContent="flex-end">
              <Box>
                <Button variant="contained" onClick={() => navigate('/admin/users/new')}>Add new user</Button>
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={12}>
          <br />
          {matchUpMd ?
            <DataList title="User List" columnData={columnData} items={state.users} isLoading={state.isLoadingList} onDelete={actions.delete} deleteItemKey="name" idProp="username" hideCheckbox={true} hideToolbar={true}/>
            :
            <>
            {
              state.users?.map((player) => {
                return (
                  <Box sx={{ mb: 1, p: 2 }} component={Paper}>
                    <Stack flexDirection="row" columnGap={1}>
                      <Avatar src={player.photo as string} alt={player.name} sx={{ width: 50, height: 50, fontSize: 20, mr: 1 }}>{player.initials}</Avatar>
                      <Stack flexDirection="column" flexGrow={1}>
                        <Typography>{player.name}</Typography>
                        <Typography>{player.email}</Typography>
                      </Stack>
                      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <IconButton onClick={() => navigate(`/admin/users/${player.username}`)}><MoreVertIcon /></IconButton>
                      </Box>
                    </Stack>
                  </Box>
                );
              })
            }
            </>
          }
        </Grid>
      </Grid>
    </Page>
  );
}
