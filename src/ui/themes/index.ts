import { createTheme } from '@mui/material/styles';
import { PaletteMode, ThemeOptions } from '@mui/material';
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

type Customisation = {
  mode: PaletteMode
}

export type CustomTheme = {

} & Customisation;

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization: Customisation) => {

    // Passing some customisation to the theme
    const themeOption: CustomTheme = {
      ...customization
    }

    const isDark = customization.mode === 'dark';

    const themeOptions: ThemeOptions = {
      direction: 'ltr',
      palette: themePalette(themeOption, isDark),
      typography: themeTypography(themeOption, isDark)
    }

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption, isDark);

    return themes;
};

export default theme;
