import { Modal, Fab, Popover, Paper, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import useRepository from "../../hooks/useRepository";
import useApp from "../../hooks/useApp";
import UsersForm from "./admin/users/UsersForm";
import useUser from "../../hooks/useUsers";
import TournamentForm from "./TournamentForm";
import { useNavigate } from "react-router-dom";
import UsersIcon from '@mui/icons-material/People';

export default function ActionsButton() {
  const navigate = useNavigate();
  const [ openTournamentModal, setOpenTournamentModal ] = useState<boolean>(false);
  const [ openUserModal, setOpenUserModal ] = useState<boolean>(false);

  const { tournamentsRepository } = useApp();
  const [ tournamentState, tournamentActions ] = useRepository(tournamentsRepository);
  const [ userState, userActions ] = useUser();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openPopover = Boolean(anchorEl);

  const handleCloseTournamentModal = () => {
    handleClosePopover();
    setOpenTournamentModal(false);
  }

  const handleCloseUserModal = () => {
    handleClosePopover();
    setOpenUserModal(false);
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
                <ListItemButton onClick={() => { navigate('/tournament/new'); handleClosePopover(); } }>
                  <ListItemIcon>
                    <EmojiEventsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add tournament"  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { navigate('/admin/users/new'); handleClosePopover(); } }>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add player"  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { navigate('/admin/users'); handleClosePopover(); } }>
                  <ListItemIcon>
                    <UsersIcon />
                  </ListItemIcon>
                  <ListItemText primary="Players"  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
      </Popover>

      <Fab color="primary" sx={{ position: 'fixed', bottom: 30, right: 30 }} onClick={handleClick}>
        <AddIcon />
      </Fab>

      <Modal open={openUserModal} onClose={handleCloseUserModal}>
        <FloatBox sx={{ p: 1 }} component={Paper}>
          <UsersForm state={userState} actions={userActions} onCancel={handleCloseUserModal} />
        </FloatBox>
      </Modal>

      <Modal open={openTournamentModal} onClose={handleCloseTournamentModal}>
        <FloatBox sx={{ p: 1 }} component={Paper}>
          <TournamentForm state={tournamentState} actions={tournamentActions} onCancel={handleCloseTournamentModal} />
        </FloatBox>
      </Modal>
    </>
  );
}

const FloatBox = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  padding: 0,
  overflow: 'auto'
}));
