import { Grid } from "@mui/material";
import Page from "./Page";
import Title from "../components/Title";
import useUser from "../../hooks/useUsers";
import useAuth from "../../hooks/useAuth";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountDetailsForm from "../components/my-account/AccountDetailsForm";

export default function MyAccount() {

  const { authUser } = useAuth();
  const [ state, actions ] = useUser(authUser?.username, { list: false });

  return (
    <Page title="My Account">
      <Grid container>
        <Grid item xs={12}>
          <Title title="My Account" icon={SettingsIcon} link="/my-account" />
        </Grid>
        <Grid item xs={12}>
          <AccountDetailsForm user={state.user} state={state} actions={actions} isLoading={state.isLoadingUser} />
        </Grid>
      </Grid>
    </Page>
  );
}
