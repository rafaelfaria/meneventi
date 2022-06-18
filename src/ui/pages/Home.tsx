import { Box, Grid, Typography } from "@mui/material";
import useApp from "../../hooks/useApp";
import useRepository from "../../hooks/useRepository";
import { Tournament } from "../../lib/amplify/API";
import Page from "./Page";
import ReactLoading from 'react-loading';
import TournamentCard from "../components/TournamentCard";

export default function Home() {

  const { tournamentsRepository } = useApp();
  const [ state ] = useRepository<Tournament>(tournamentsRepository);

  return (
    <Page title="Tournaments">

      <Grid container spacing={0} columnSpacing={4}>

        {state.isLoadingItem &&
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <ReactLoading type="bars" color="#d7e0e8" width={200} height={200}  />
              <Typography variant="h6" color="#c3c3c3">Loading...</Typography>
            </Box>
          </Grid>
        }

        {state.items?.length &&
          state.items?.map((item) => <Grid item xs={12} sx={{ mb: 2 }}><TournamentCard data={item} /></Grid>)
        }

      </Grid>

    </Page>
  );
}
