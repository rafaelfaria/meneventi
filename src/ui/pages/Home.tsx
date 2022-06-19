import { Box, Grid, Typography } from "@mui/material";
import useApp from "../../hooks/useApp";
import useRepository from "../../hooks/useRepository";
import { Tournament } from "../../lib/amplify/API";
import Page from "./Page";
import ReactLoading from 'react-loading';
import TournamentCard from "../components/TournamentCard";
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import { onCreateTournamentPublic, onUpdateTournamentPublic, onDeleteTournamentPublic } from "../../lib/amplify/graphql/subscriptions";

export default function Home() {

  const { tournamentsRepository } = useApp();
  const [ state ] = useRepository<Tournament>(tournamentsRepository, {
    subscribeOnCreate: {
      config: { key: 'onCreateTournamentPublic', query: onCreateTournamentPublic, authMode: GRAPHQL_AUTH_MODE.AWS_IAM }
    },
    subscribeOnUpdate: {
      config: { key: 'onUpdateTournamentPublic', query: onUpdateTournamentPublic, authMode: GRAPHQL_AUTH_MODE.AWS_IAM }
    },
    subscribeOnDelete: {
      config: { key: 'onDeleteTournamentPublic', query: onDeleteTournamentPublic, authMode: GRAPHQL_AUTH_MODE.AWS_IAM }
    }
  });

  return (
    <Page title="Tournaments">

      <Grid container spacing={0} columnSpacing={4}>

        {state.isLoadingList ?
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <ReactLoading type="bars" color="#d7e0e8" width={200} height={200}  />
              <Typography variant="h6" color="#c3c3c3">Loading...</Typography>
            </Box>
          </Grid>
          : null
        }

        {state.items?.length ?
          state.items?.map((item) => <Grid key={item.id} item xs={12} sx={{ mb: 2 }}><TournamentCard data={item} /></Grid>)
          : null
        }

      </Grid>

    </Page>
  );
}
