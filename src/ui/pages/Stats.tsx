import { Box, Grid, Stack, Typography } from "@mui/material";
import useApp from "../../hooks/useApp";
import useRepository from "../../hooks/useRepository";
import { Tournament } from "../../lib/amplify/API";
import Page from "./Page";
import Title from "../components/Title";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { onCreateTournamentPublic, onDeleteTournamentPublic, onUpdateTournamentPublic } from "../../lib/amplify/graphql/subscriptions";
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import useStats, { StatsProps } from "../../hooks/useStats";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import Dropdown from "../components/forms/Dropdown";
import DataList from "../components/table/DataList";
import statsData from "../components/table-columns/StatsData";
import finalTableData from "../components/table-columns/FinalTableData";

const DEFAULT_YEAR_FILTER = (new Date()).getFullYear();

type FormData = {
  yearFilter: number | string
}

export default function Stats() {
  const [ stats, setStats ] = useState<any>([]);

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

  const meneventiStats = useStats()

  const formActions = useForm<FormData>({
    defaultValues: {
      yearFilter: DEFAULT_YEAR_FILTER
    }
  });
  const yearFilter = useWatch({ control: formActions.control, name: 'yearFilter'})

  useEffect(() => {
    (async () => {
      console.log(yearFilter)
      let filter;
      if (yearFilter !== 'All') {
        filter = {
          date: {
            gt: (new Date(yearFilter as number, 0, 1)).toISOString(),
            lt: (new Date(yearFilter as number +1 , 0, 1)).toISOString(),
          }
        }
      }
      const items = await actions.list({
        updateListState: true,
        filter
      });

      const s = meneventiStats.getStats(items);
      setStats(s);

    })();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearFilter]);

  return (
    <Page title="Stats">

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack flexDirection="row" alignItems="center">
            <Title title="Stats" icon={QueryStatsIcon} link="/" sx={{ mr: 2 }}/>
            <Dropdown
                name="yearFilter"
                variant="filled"
                fullWidth
                label="Year"
                options={[
                  { label: 'All', value: 'All' },
                  { label: '2023', value: 2023 },
                  { label: '2022', value: 2022 },
                ]}
                control={formActions.control}
                sx={{ mb: 2, width: 100 }}
                size="small"
            />
          </Stack>

        </Grid>

        {state.isLoadingList ?
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <ReactLoading type="bars" color="#d7e0e8" width={200} height={200}  />
              <Typography variant="h6" color="#c3c3c3">Loading...</Typography>
            </Box>
          </Grid>
          : null
        }


        {!state.isLoadingList ?
          <>
            <Grid item xs={12} md={4}>
              <TableList title="Top 5 - 1st Place" stats={stats.p1} dataRender={statsData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TableList title="Top 5 - 2nd Place" stats={stats.p2} dataRender={statsData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TableList title="Top 5 - 3rd Place" stats={stats.p3} dataRender={statsData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TableList title="Top 5 - Final Table" stats={stats.final} dataRender={statsData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TableList title="Top 5 - Number of Buy-ins" stats={stats.buyIn} dataRender={statsData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TableList title="Top 5 - Tournament Played" stats={stats.played} dataRender={statsData} />
            </Grid>
            <Grid item xs={12} md={12}>
              <TableList title="Top 5 - Final Table" stats={stats.finalTable} dataRender={finalTableData} />
            </Grid>
        </> : null}
        </Grid>
    </Page>
  );
}


type ListProps = {
  title: string,
  stats: StatsProps[],
  dataRender: any
}

const TableList = ({ title, stats, dataRender }: ListProps) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>{title}</Typography>
      <DataList title={title} columnData={dataRender} items={stats}  hideCheckbox={true} hideToolbar={true} />
    </Box>
  )
}
