import React from 'react';

// Material
import { Box, Paper } from '@mui/material';

type Props = {
  children: React.ReactNode
}

const FormBody: React.FC<Props> = ({ children }) => {
  return (
     <Box component={Paper}>
       {children}
    </Box>
  );
}

export default FormBody;