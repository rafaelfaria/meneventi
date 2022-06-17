import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CampaignIcon from '@mui/icons-material/Campaign';

const menuItems = [
  {
    type: 'menu',
    icon: <DashboardIcon color="inherit" />,
    label: 'Dashboard',
    link: '/'
  },
  {
    type: 'menu',
    icon: <EmojiEventsIcon color="inherit" />,
    label: 'Eventos',
    link: '/eventos'
  },
  {
    type: 'menu',
    icon: <CampaignIcon color="inherit" />,
    label: 'Sinais',
    link: '/sinais'
  }
];

export default menuItems;