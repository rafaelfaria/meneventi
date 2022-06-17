/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

import { CustomTheme } from ".";


declare module '@mui/material/styles' {
  interface Palette {
    gradient: Palette['primary'];
    mainMenuGradient: Palette['primary'];
    secondaryGradient: Palette['primary'];
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    gradient?: PaletteOptions['primary'];
    mainMenuGradient?: PaletteOptions['primary'];
    secondaryGradient?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gradient: true;
    mainMenuGradient: true;
    secondaryGradient: true;
    neutral: true;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    gradient: true;
    mainMenuGradient: true;
    secondaryGradient: true;
    neutral: true;
  }
}

export default function themePalette(theme: CustomTheme, isDark: boolean) {
    return {
      mode: theme.mode || 'dark',
      primary: {
        main: isDark ? '#5d60cc' : '#1976d2',
      },
      secondary: {
        main: isDark ? '#da3754' : '#9c27b0',
      },
      neutral: {
        main: isDark ? '#2c2c2c' : '#EEEEEE',
      },
      gradient: {
        light: 'linear-gradient(45deg,#303f9f,#1976d2)',
        main: 'linear-gradient(45deg,#303f9f,#1976d2)',
        dark: 'linear-gradient(90deg, rgb(26 28 38) 0%, rgb(14 14 14) 100%)'
      },
      secondaryGradient: {
        light: 'linear-gradient(45deg,#303f9f,#1976d2)',
        main: 'linear-gradient(45deg,#303f9f,#1976d2)',
        dark: 'linear-gradient(139.73deg, rgb(49 55 71) 0%, rgb(30 30 30) 100%)'
      },
      mainMenuGradient: {
        light: 'linear-gradient(45deg,#303f9f,#1976d2)',
        main: 'linear-gradient(45deg,#303f9f,#1976d2)',
        dark: 'linear-gradient(149deg, rgb(22 21 21) 0%, rgb(86 85 101) 100%)'
      },
    };


}

