import UsersIcon from '@mui/icons-material/People';
import Grid from '@mui/material/Grid';
import Page from "../Page";
import Title from "../../components/Title";
import useUser from '../../../hooks/useUsers';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import UserCard from '../../components/UserCard';

export default function AdminUsers() {

  const [ state ] = useUser();
  const navigate = useNavigate();

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
           <br />
        </Grid>
        {(state.isLoadingList) &&
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <ReactLoading type="bars" color="#d7e0e8" width={200} height={200}  />
              <Typography variant="h6" color="#c3c3c3">Loading...</Typography>
            </Box>
          </Grid>
        }
        <Grid item xs={12} md={12}>
          {state.users?.map((player) => <UserCard data={player} />)}
        </Grid>
      </Grid>
    </Page>
  );
}
