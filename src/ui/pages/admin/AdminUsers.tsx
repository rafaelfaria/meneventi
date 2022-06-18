import UsersIcon from '@mui/icons-material/People';
import Grid from '@mui/material/Grid';
import Page from "../Page";
import DataList from "../../components/table/DataList";
import Title from "../../components/Title";
import useUser from '../../../hooks/useUsers';
import columnData from '../../components/admin/users/ColumnData';

export default function AdminUsers() {

  const [ state, actions ] = useUser();

  return (
    <Page title="Admin | Users">
      <Grid container spacing={0} columnSpacing={4}>
        <Grid item xs={12} md={12}>
          {/* Page Title */}
          {/* ********************************************************************* */}
          <Title title="Usuários" icon={UsersIcon} link="/admin/users" />
        </Grid>
        <Grid item xs={12} md={12}>
          <DataList title="User List" columnData={columnData} items={state.users} isLoading={state.isLoadingList} onDelete={actions.delete} deleteItemKey="name" idProp="username" hideCheckbox={true} hideToolbar={true}/>
        </Grid>
      </Grid>
    </Page>
  );
}
