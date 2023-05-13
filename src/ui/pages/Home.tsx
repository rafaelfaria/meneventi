import { Box, Grid, Stack, Typography } from "@mui/material";
import useApp from "../../hooks/useApp";
import useRepository from "../../hooks/useRepository";
import { Tournament } from "../../lib/amplify/API";
import Page from "./Page";
import ReactLoading from 'react-loading';
import TournamentCard from "../components/TournamentCard";
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import { onCreateTournamentPublic, onUpdateTournamentPublic, onDeleteTournamentPublic } from "../../lib/amplify/graphql/subscriptions";
import useLeaderboard from "../../hooks/useLeaderboard";
import DataList from "../components/table/DataList";
import LeaderboardData from "../components/table-columns/LeaderboardData";
import Dropdown from "../components/forms/Dropdown";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import useProfile from "../../hooks/useProfile";

type FormData = {
  yearFilter: number
}

const DEFAULT_YEAR_FILTER = (new Date()).getFullYear();

export default function Home() {

  const { tournamentsRepository } = useApp();
  const [ state, actions ] = useRepository<Tournament>(tournamentsRepository, {
    listOptions: {
      filter: {
        date: {
          gt: (new Date(DEFAULT_YEAR_FILTER, 0, 1)).toISOString(),
          lt: (new Date(DEFAULT_YEAR_FILTER+1, 0, 1)).toISOString(),
        }
      },
    },
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

  const { openProfile } = useProfile();

  const [ leaderboard ] = useLeaderboard({ list: state.items })
  const formActions = useForm<FormData>({
    defaultValues: {
      yearFilter: DEFAULT_YEAR_FILTER
    }
  });
  const yearFilter = useWatch({ control: formActions.control, name: 'yearFilter'})

  useEffect(() => {
    (async () => {
      console.log(yearFilter)
      await actions.list({
        updateListState: true,
        filter: {
          date: {
            gt: (new Date(yearFilter, 0, 1)).toISOString(),
            lt: (new Date(yearFilter+1, 0, 1)).toISOString(),
          }
        }
      });

    })();
  }, [yearFilter]);

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
          <>
            <Grid item xs={12}>
              <Stack flexDirection="row" alignItems="center">
                <Typography variant="h5" sx={{ mb: 2, mr: 1 }}>
                  Leaderboard
                </Typography>
                <Dropdown
                    name="yearFilter"
                    variant="filled"
                    fullWidth
                    label="Year"
                    options={[
                      { label: '2023', value: 2023 },
                      { label: '2022', value: 2022 },
                    ]}
                    control={formActions.control}
                    sx={{ mb: 2, width: 100 }}
                    size="small"
                  />
                </Stack>
            </Grid>
            <Grid item xs={12} sx={{ mb: 5 }} >
              <DataList
                title="Leaderboard"
                columnData={LeaderboardData}
                columnDataParams={{ openProfile }}
                items={leaderboard}
                hideCheckbox={true}
                hideToolbar={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 2 }}>Tournaments</Typography>
            </Grid>
            {state.items?.map((item) => <Grid key={item.id} item xs={12} sx={{ mb: 2 }}><TournamentCard data={item} /></Grid>)}
          </>
          : null
        }

      </Grid>

    </Page>
  );
}
