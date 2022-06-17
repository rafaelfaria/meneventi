import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function RegisterSuccess() {
  const navigate = useNavigate();

  return (
    <>
    	<Alert severity="success">
          Your password has been successfully changed!
      </Alert>

      <Button variant="contained" fullWidth onClick={() => navigate('/login')} sx={{ mt: 2}}>
        Login
      </Button>
    </>
  );
}
