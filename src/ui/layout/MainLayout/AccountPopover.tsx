import { useRef, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Divider, IconButton, MenuItem, Typography } from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Minha conta',
    icon: <SettingsIcon sx={{ color: '#797979' }} />,
    linkTo: '/minha-conta'
  },
  {
    label: 'Deslogar',
    icon: <LogoutIcon sx={{ color: '#797979' }} />,
    linkTo: '/deslogar'
  }
];


export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

   return (
     <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          ml: 2
        }}
      >
        <Avatar>RC</Avatar>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            Test
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            test@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={Link}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            {option.icon}
            <Typography variant="body2" sx={{ color: 'text.primary', ml: 1 }} noWrap>
              {option.label}
            </Typography>
          </MenuItem>
        ))}

      </MenuPopover>
    </>
  );
}

/*********************************************************************************
 * This styles are used to show the progress of the plan
 ********************************************************************************/

type PlanProgressProps = {
  progress?: number;
};
const PlanProgress = styled(Box)<PlanProgressProps>(({ theme, progress }) => ({
  position: 'relative',
  width: '100%',
  borderRadius: '8px',
  border: '1px solid #88baec',
  borderColor: theme.palette.mode === 'dark' ? '#b7b7b7' : '#88baec',
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1d6ac7',
  padding: '2px',
  textAlign: 'center',
  ':before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    background: theme.palette.mode === 'dark' ? '#242637' : '#e3f6ff',
    width: `${progress}%`,
    height: '100%',
    borderRadius: '8px',
  }
}));