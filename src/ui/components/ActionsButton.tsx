import { Modal, Fab, Popover, Paper, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleIcon from '@mui/icons-material/People';
import TeamForm from "./teams/TeamForm";
import useRepository from "../../hooks/useRepository";
import useApp from "../../hooks/useApp";
import UsersForm from "./admin/users/UsersForm";
import useUser from "../../hooks/useUsers";

const MENEVENTI_TEAM = '9f7ecfa7-f541-4166-96ed-606cc7999f92'

export default function ActionsButton() {
  const [ openTournamentModal, setOpenTournamentModal ] = useState<boolean>(false);
  const [ openTeamModal, setOpenTeamModal ] = useState<boolean>(false);
  const [ openUserModal, setOpenUserModal ] = useState<boolean>(false);

  const { teamsRepository } = useApp();
  const [ teamState, teamActions ] = useRepository(teamsRepository)
  const [ userState, userActions ] = useUser();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openPopover = Boolean(anchorEl);

  const handleCloseTeamModal = () => {
    handleClosePopover();
    setOpenTeamModal(false);
  }

  const handleCloseTournamentModal = () => {
    handleClosePopover();
    setOpenTournamentModal(false);
  }

  const handleCloseUserModal = () => {
    handleClosePopover();
    setOpenUserModal(false);
  }

  const handleEditTeam = async () => {
    setOpenTeamModal(true);
    handleClosePopover();
    await teamActions.getById(MENEVENTI_TEAM);
  }

  return (
    <>
     <Popover
        open={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            background: 'transparent',
            boxShadow: 'none'
          }
        }}
        anchorEl={anchorEl}
      >
          <Box component={Paper} sx={{
            overflow: 'inherit',
            boxShadow: (theme) => theme.palette.mode === 'dark' ? 'rgb(0 0 0) 0px 0px 2px 0px, rgb(0 0 0 / 16%) 1px 13px 7px -4px' : 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 20px 40px -4px',
            border: '1px solid rgba(145, 158, 171, 0.08)',
            width: 250,
            mb: 10
          }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { setOpenTournamentModal(true); handleClosePopover(); } }>
                  <ListItemIcon>
                    <EmojiEventsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Tournament"  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleEditTeam}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit Team"  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { setOpenUserModal(true); handleClosePopover(); } }>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add user"  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
      </Popover>

      <Fab color="primary" sx={{ position: 'fixed', bottom: 30, right: 30 }} onClick={handleClick}>
        <AddIcon />
      </Fab>

      <Modal open={openTeamModal} onClose={handleCloseTeamModal}>
        <FloatBox sx={{ p: 3 }} component={Paper}>
          <TeamForm state={teamState} actions={teamActions} team={teamState.item} isLoading={teamState.isLoadingItem} onCancel={handleCloseTeamModal} />
        </FloatBox>
      </Modal>

      <Modal open={openUserModal} onClose={handleCloseUserModal}>
        <FloatBox sx={{ p: 3 }} component={Paper}>
          <UsersForm state={userState} actions={userActions} onCancel={handleCloseUserModal} />
        </FloatBox>
      </Modal>

      <Modal open={openTournamentModal} onClose={handleCloseTournamentModal}>
        <FloatBox sx={{ p: 3 }} component={Paper}>
          TESTE
          {/* <TournamentsFormSimple title="Tournaments Rapidos" initialData={initialData} onCreated={handleCloseTournamentModal} /> */}
        </FloatBox>
      </Modal>
    </>
  );
}

const FloatBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '95%',
  padding: 0,
  [theme.breakpoints.up('md')]: {
    minWidth: '800px',
  }
}));
