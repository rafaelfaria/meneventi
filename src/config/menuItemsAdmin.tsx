import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CampaignIcon from '@mui/icons-material/Campaign';

const menuItems = [
  {
    type: 'menuTitle',
    label: 'Admin',
  },
  {
    type: 'menu',
    icon: <EmojiEventsIcon color="inherit" />,
    label: 'Events',
    children: [
      {
        type: 'menu',
        label: 'Adicionar Evento',
        link: '/admin/eventos/novo'
      },
      {
        type: 'menu',
        label: 'Lista de Eventos',
        link: '/admin/eventos'
      },
    ]
  },
  {
    type: 'menu',
    icon: <CampaignIcon color="inherit" />,
    label: 'Sinais',
    children: [
      {
        type: 'menu',
        label: 'Adicionar Sinal',
        link: '/admin/sinais/novo'
      },
      {
        type: 'menu',
        label: 'Lista de Sinais',
        link: '/admin/sinais'
      },
    ]
  },
];

export default menuItems;