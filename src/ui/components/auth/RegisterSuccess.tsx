import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Box } from "@mui/material";

export default function RegisterSuccess() {
  const navigate = useNavigate();

  return (
    <Box>
    	<Alert severity="success">
        Your account has been successfully created!
      </Alert>

      <Button variant="contained" fullWidth onClick={() => navigate('/login')} sx={{ mt: 2}}>
        Login now
      </Button>
    </Box>
  );
}
