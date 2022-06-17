import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function RegisterSuccess() {
  const navigate = useNavigate();

  return (
    <>
    	<Alert severity="success">
          Sua senha foi alterada com sucesso!
      </Alert>

      <Button variant="contained" fullWidth onClick={() => navigate('/login')} sx={{ mt: 2}}>
        Logar
      </Button>
    </>
  );
}
