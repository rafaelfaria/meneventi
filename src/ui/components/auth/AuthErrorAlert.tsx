import Alert from '@mui/material/Alert';

type AuthErrorAlertProps = {
	message: string | undefined | null;
}

function AuthErrorAlert({ message }: AuthErrorAlertProps) {
	return(
		(
			message &&
				<Alert severity="error" sx={{ mb: 4 }}>
					{message}
				</Alert>
		)
		|| null
	)
}


export default AuthErrorAlert;
