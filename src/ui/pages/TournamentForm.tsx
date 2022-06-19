import { Box, Grid, Typography } from "@mui/material";
import useApp from "../../hooks/useApp";
import useRepository from "../../hooks/useRepository";
import { Tournament } from "../../lib/amplify/API";
import Page from "./Page";
import ReactLoading from 'react-loading';
import Title from "../components/Title";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useParams } from "react-router-dom";
import TournamentForm from "../components/TournamentForm";

export default function Tournaments() {

  const params = useParams();
  const isEditing = params.id;

  const { tournamentsRepository } = useApp();
  const [ state, actions ] = useRepository<Tournament>(tournamentsRepository, { initialId: params.id });

  return (
    <Page title="Tournaments">

      <Grid container>

        <Grid item xs={12}>
          <Title title={isEditing ? 'Edit Tournament' : 'Add Tournament'} icon={EmojiEventsIcon} link="/" />
        </Grid>
        <Grid item xs={12}>
          <TournamentForm state={state} actions={actions} tournament={state.item} isLoading={state.isLoadingItem} />
        </Grid>
      </Grid>

    </Page>
  );
}
