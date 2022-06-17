import { Button, CircularProgress, Box } from '@mui/material';
import { blue } from '@mui/material/colors';

const ButtonWithSpinner: React.FC<any> = ({ showSpinner, disabled, onClick, children, ...props }) => {
return (
   <Box sx={{ position: 'relative', display: 'inline-block', width: props.fullWidth ? "100%" : "auto" }}>
      <Button {...props} disabled={disabled || showSpinner} onClick={onClick}>{children}</Button>
      {showSpinner && (
        <CircularProgress
          size={24}
          sx={{
            color: blue[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
}

export default ButtonWithSpinner;