import { Grid } from "@mui/material";
import Page from "./Page";
import Title from "../components/Title";
import useApp from "../../hooks/useApp";
import useRepository from "../../hooks/useRepository";
import ArticleIcon from '@mui/icons-material/FactCheck';
import { Team } from "../../lib/amplify/API";

// components
import TeamForm from "../components/teams/TeamForm";

export default function Teams() {

  const { teamsRepository } = useApp();
  const [ state, actions ] = useRepository<Team>(teamsRepository);

  return (
    <Page title="Admin | Teams">

      <Grid container spacing={0} columnSpacing={4}>

        <Grid item xs={12} md={12}>
          {/* Page Title */}
          {/* ********************************************************************* */}
          <Title title="Teams" icon={ArticleIcon} link="/teams" />
        </Grid>
        <Grid item xs={12} md={12}>
          <TeamForm state={state} actions={actions} team={state.item} isLoading={state.isLoadingItem} />
        </Grid>
      </Grid>
    </Page>
  );
}
