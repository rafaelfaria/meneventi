import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import Box from '@mui/material/Box';

import { Container } from '@mui/material';
import FullWidthWrapper from '../FullwidthWrapper';
import ReactLoading from 'react-loading';

import Logo from '../../../assets/logo-chip.png';

export default function AuthLoading() {

  return (
    <FullWidthWrapper>
      <Container sx={{ mt:10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Box sx={{ position: 'relative' }}>
          <RotatedBox src={Logo} alt="Loading..." width={150} height={150} style={{ position: 'absolute', top: '50%', left: '50%' }} />
          <ReactLoading type="spinningBubbles" color="#a9afd7" height={300} width={300} />
        </Box>
      </Container>
    </FullWidthWrapper>
  );
}


const spin = keyframes`
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0x);
  }
`;


const RotatedBox = styled('img')({
  transition: 'all 1s ease-in-out',
  animation: `${spin} 2s infinite ease`,
  transformOrigin: 'center center',
  margin: '-75px 0 0 -75px'
});