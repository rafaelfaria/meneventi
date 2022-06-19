import { Grid } from "@mui/material";
import Page from "./Page";
import Title from "../components/Title";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountChangePasswordForm from "../components/my-account/AccountChangePasswordForm";

export default function MyAccountChangePassword() {

  return (
    <Page title="My Account | Change Password">
      <Grid container>
        <Grid item xs={12}>
          <Title title="Change Password" icon={LockOpenIcon} link="/my-account/change-password" />
        </Grid>
        <Grid item xs={12}>
          <AccountChangePasswordForm />
        </Grid>
      </Grid>
    </Page>
  );
}
