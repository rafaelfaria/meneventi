import AppProvider from "./context/AppProvider";

// routing
import Routes from './routes';

// theming
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, PaletteMode, StyledEngineProvider } from '@mui/material';

// defaultTheme
import themes from './ui/themes';
import useColorMode from "./hooks/useColorMode";

export default function App() {

  const { mode } = useColorMode();

  return (
    <StyledEngineProvider injectFirst>
      <AppProvider>
        <ThemeProvider theme={themes({ mode: mode as PaletteMode })}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </AppProvider>
    </StyledEngineProvider>
  );
}
