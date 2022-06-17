import AppProvider from "./context/AppProvider";

// routing
import Routes from './routes';

// theming
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, PaletteMode, StyledEngineProvider } from '@mui/material';

// defaultTheme
import themes from './ui/themes';
import useColorMode from "./hooks/useColorMode";
import AuthProvider from "./context/AuthProvider";
import ConfirmProvider from './context/ConfirmProvider';

export default function App() {

  const { mode } = useColorMode();

  return (
    <StyledEngineProvider injectFirst>
      <ConfirmProvider>
        <AuthProvider>
          <AppProvider>
            <ThemeProvider theme={themes({ mode: mode as PaletteMode })}>
              <CssBaseline />
              <Routes />
            </ThemeProvider>
          </AppProvider>
        </AuthProvider>
      </ConfirmProvider>
    </StyledEngineProvider>
  );
}
