import { Box, Button, Grid, Stack } from "@mui/material";
import Page from "./Page";
import Title from "../components/Title";
import useApp from "../../hooks/useApp";
import useRepository from "../../hooks/useRepository";
import ArticleIcon from '@mui/icons-material/FactCheck';
import { Team } from "../../lib/amplify/API";
import { useNavigate } from "react-router-dom";

// components
import DataList from "../components/table/DataList";
import columnData from '../components/teams/ColumnData';

export default function Teams() {

  const { teamsRepository } = useApp();
  const [ state, actions ] = useRepository<Team>(teamsRepository);
  const navigate = useNavigate();

  return (
    <Page title="Admin | Teams">

      <Grid container spacing={0} columnSpacing={4}>

        <Grid item xs={12} md={12}>
          <Stack flexDirection="row">
            <Title title="Teams" icon={ArticleIcon} link="/teams" />
            <Box display="flex" flexGrow={1} width="100%" justifyContent="flex-end">
              <Box>
                <Button variant="contained" onClick={() => navigate('/teams/new')}>Add new team</Button>
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={12}>
          <DataList title="Lista de Times" columnData={columnData} items={state.items} isLoading={state.isLoadingList} onDelete={actions.delete} deleteItemKey="name" />
        </Grid>
      </Grid>
    </Page>
  );
}
