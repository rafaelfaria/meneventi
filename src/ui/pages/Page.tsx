import React, { forwardRef } from 'react';
import useHelmet from '../../hooks/useHelmet';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Page: React.FC<Props> = forwardRef(({ children, title = '', description = '', ...other }, ref: any) => {

  const Helmet = useHelmet({ title, description });

  return (
    <Box ref={ref} {...other}>
      <Helmet />
      {children}
    </Box>
  )
});


export default Page;
