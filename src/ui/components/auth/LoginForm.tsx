import { useForm } from "react-hook-form";
import useApp from "../../../hooks/useApp";
import ButtonWithSpinner from '../ButtonWithSpinner';
import TextField from '../forms/TextField';
import styled from '@emotion/styled';
import Box from "@mui/material/Box";
import ButtonLink from "../ButtonLink";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { AuthUser } from "../../../lib/auth/types";

type FormData = {
  email: string;
  password: string;
}

type Props = {
  isLoading: boolean;
  onSubmit: (email: string) => void;
  onSuccess: (user: AuthUser) => void;
  onError: (err: any) => void;
};

export default function LoginForm({ onSubmit, onSuccess, onError, isLoading }: Props) {
  const [ rememberEmail, setRememberEmail ] = useLocalStorage('login:rememberEmail', '');
  const { authRepository } = useApp();

  const formActions = useForm<FormData>({
    defaultValues: {
      email: rememberEmail,
    }
  });

   /**
   * Handle the submit form by calling the signin method with email and password
   * and if everything checks, then reload the "checkAuth" to pick up the logged in information and save in the context
   */
  const handleSubmitForm = async ({ email, password }: FormData) => {
    try {
      onSubmit(email);
      const user = await authRepository.signIn(email, password);
      onSuccess(user);
    } catch(err: any) {
      console.log(err);
      onError(err);
    }
  }



  return (

    <form onSubmit={formActions.handleSubmit(handleSubmitForm)}>

      <TextField variant="outlined" type="email" label="Email" placeholder={"seu@email.com"}
        {...formActions.register("email", { required: true })}
        fullWidth
        sx={{ mb: 2 }}
        autoComplete="on"
      />

      <TextField variant="outlined" type="password" label="Password"
        {...formActions.register("password", { required: true })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <ButtonLink to="/forgot-password">Forgot password?</ButtonLink>
      </Box>
      <br/>


      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ButtonWithSpinner type="submit" variant="contained" fullWidth showSpinner={isLoading}>
            Login
        </ButtonWithSpinner>
      </Box>

      {/* <SignUpContainer>
          New around here? <ButtonLink to="/register">Sign Up</ButtonLink>
      </SignUpContainer> */}
    </form>
  );
}


const SignUpContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;
