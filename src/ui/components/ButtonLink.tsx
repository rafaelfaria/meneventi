import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

type Props = {
  to: string;
  children: React.ReactNode
}

const ButtonLink: React.FC<Props> = ({ to, children }) => {
  return (
    <Button to={to} component={Link} sx={{ pl: 0, pr: 0 }} variant="text">
      {children}
    </Button>
  )
}

export default ButtonLink;