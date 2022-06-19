import { Typography, Stack, Box, Avatar, IconButton, Paper } from '@mui/material';
import { User } from "../../lib/amplify/API";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: Partial<User>;
}

export default function UserCard({ data }: Props) {

  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 1, p: 2 }} component={Paper}>
      <Stack flexDirection="row" columnGap={1}>
        <Avatar src={data.photo as string} alt={data.name} sx={{ width: 50, height: 50, fontSize: 20, mr: 1 }}>{data.initials}</Avatar>
        <Stack flexDirection="column" flexGrow={1}>
          <Typography>{data.name}</Typography>
          <Typography>{data.email}</Typography>
        </Stack>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <IconButton onClick={() => navigate(`/admin/users/${data.username}`)}><MoreVertIcon /></IconButton>
        </Box>
      </Stack>
    </Box>
  );
}


