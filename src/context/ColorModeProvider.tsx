import { PaletteMode } from "@mui/material";
import React, { useState, useMemo } from "react";
import { ColorModeContext } from ".";
import useLocalStorage from "../hooks/useLocalStorage";

type Props = {
  children: React.ReactNode;
};

const ColorModeProvider: React.FC<Props> = ({ children }) => {
  const [ themeColor, setThemeColor ] = useLocalStorage('themeColor', 'dark');
  const [ mode, setMode ] = useState<PaletteMode>(themeColor);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newColorMode = (prevMode === 'light' ? 'dark' : 'light');
          setThemeColor(newColorMode);
          return newColorMode;
        });
      },
    }),
    [],
  );

  return (
    <ColorModeContext.Provider value={{ ...colorMode, mode, isDark: mode === 'dark' }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
