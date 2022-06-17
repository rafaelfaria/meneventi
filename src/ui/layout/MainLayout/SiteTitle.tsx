import { useNavigate } from 'react-router-dom';

// Material
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// Config
import AppConfig from '../../../config';

// components
import LogoSmall from '../../../assets/logo-chip.png'

export default function SiteTitle() {

  const navigate = useNavigate();

  return (
    <Branding onClick={() => navigate('/')}>
      <img src={LogoSmall} width={40} alt="Meneventi" />
      <SiteName className="branding-name">Meneventi</SiteName>
    </Branding>
  );
}

/*********************************************************************************
 * Branding
 ********************************************************************************/
const Branding = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  width: 'inherit',
  boxShadow: `0 1px 2px ${theme.palette.mode === 'dark' ? '-1px' : '1px'} rgb(209 206 206 / 20%)`,
  padding: '22px 12px 22px 10px',
  overflow: 'hidden',
  cursor: 'pointer'
}));

const SiteName = styled(Typography)(() => ({
  fontSize: 30,
  marginLeft: 10,
  color: 'inherit',
  cursor: 'pointer'
}));

