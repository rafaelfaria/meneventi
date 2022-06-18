import UsersIcon from '@mui/icons-material/People';
import Grid from '@mui/material/Grid';
import Page from "../Page";
import DataList from "../../components/table/DataList";
import Title from "../../components/Title";
import useUser from '../../../hooks/useUsers';
import columnData from '../../components/admin/users/ColumnData';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminUsers() {

  const [ state, actions ] = useUser();
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
        </Grid>
        <Grid item xs={12} md={12}>
          <DataList title="User List" columnData={columnData} items={state.users} isLoading={state.isLoadingList} onDelete={actions.delete} deleteItemKey="name" idProp="username" hideCheckbox={true} hideToolbar={true}/>
        </Grid>
      </Grid>
    </Page>
  );
}
