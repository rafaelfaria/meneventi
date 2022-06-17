import React from "react";
import { Paper, Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
}

const AuthBox: React.FC<Props> = ({ children }) => (
  <Paper sx={{
    p: 5,
    m: 2,
    maxWidth: 600
  }}>
  {children}
</Paper>
);

const AuthTitle: React.FC<Props> = ({ children }) => <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}  color="primary">{children}</Typography>;

export default AuthBox;
export {
  AuthBox,
  AuthTitle
}