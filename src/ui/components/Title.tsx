import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ConditionalLink from './ConditionalLink';

type Props = {
  title: string;
  icon: any;
  sx?: any;
  link?: any;
  children?: React.ReactNode
}

const Title: React.FC<Props> = ({ icon: Icon, title, link, children, sx }) => {
  return (
    <Box sx={[{ minHeight: '40px' }, sx]}>
      <Stack flexDirection="row" alignItems="center">
        <Icon sx={{ color: '#FFFFFF', mr: 1 }} fontSize="medium" />
        <ConditionalLink to={link} condition={link}>
          <Typography variant="title" sx={{ display: 'inline-block'}}>{title}</Typography>
        </ConditionalLink>
      </Stack>
      {children}
    </Box>
  );
}

export default Title;