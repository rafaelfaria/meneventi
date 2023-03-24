import { Box } from '@mui/material';
import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

type Props = {
  children?: React.ReactNode;
  type: LoadingType;
  color?: string;
  width: number;
  height: number;
}

const Loading: React.FC<Props> = ({ children, ...settings }) => {
  return (
    <Box component="div" sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ mb: children ? 2 : 0 }}><ReactLoading {...settings} /></Box>
      {children}
    </Box>
  )
}

export default Loading;