import { Grid } from "@mui/material";
import Page from "../Page";
import UsersIcon from '@mui/icons-material/People';
import { useParams } from "react-router-dom";
import Title from "../../components/Title";
import UsersForm from "../../components/admin/users/UsersForm";
import useUser from "../../../hooks/useUsers";

export default function AdminUsersForm() {

  // Check if it's editing
  const params = useParams();
  const [ state, actions ] = useUser(params.id, { list: false });

  return (
    <Page title="Admin | Players">

      <Grid container spacing={0} columnSpacing={4}>

        <Grid item xs={12} md={4}>
          <Title title="Players" icon={UsersIcon} link="/admin/users" />
        </Grid>

        <Grid item xs={12} md={12}>
          <UsersForm state={state} actions={actions} user={state.user} isLoading={state.isLoadingUser} />
        </Grid>
      </Grid>
    </Page>
  );
}
