import { useNavigate } from 'react-router-dom';

// Material
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
const Branding = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: 'inherit',
  padding: '22px 12px 22px 22px',
  overflow: 'hidden',
  cursor: 'pointer'
}));

const SiteName = styled(Typography)(() => ({
  fontSize: 30,
  marginLeft: 10,
  color: 'inherit',
  cursor: 'pointer'
}));

