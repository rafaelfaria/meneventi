import { useRef, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Divider, IconButton, MenuItem, Typography } from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const MENU_OPTIONS = [
  {
    label: 'My account',
    icon: <SettingsIcon sx={{ color: '#797979' }} />,
    linkTo: '/my-account'
  },
  {
    label: 'Logout',
    icon: <LogoutIcon sx={{ color: '#797979' }} />,
    linkTo: '/logout'
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