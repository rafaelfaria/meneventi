import { Box, Grid, Typography } from "@mui/material";
import useApp from "../../hooks/useApp";
import useRepository from "../../hooks/useRepository";
import { Team } from "../../lib/amplify/API";
import Page from "./Page";
import ReactLoading from 'react-loading';
import PeopleIcon from '@mui/icons-material/People';
import Title from "../components/Title";
import TournamentCard from "../components/teams/TournamentCard";

const MENEVENTI_TEAM = '9f7ecfa7-f541-4166-96ed-606cc7999f92'

export default function Home() {

  const { teamsRepository } = useApp();
  const [ state ] = useRepository<Team>(teamsRepository,  { initialId: MENEVENTI_TEAM });

  return (
    <Page title="Tournaments">

      <Grid container spacing={0} columnSpacing={4}>

        {!state.isLoadingItem &&
          <Grid item xs={12} md={12}>
            <Title title={state.item?.name} icon={PeopleIcon} link="/" />
          </Grid>
        }
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
