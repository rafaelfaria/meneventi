import React from 'react';
import { createApp } from '../lib/factories/AppFactoryAmplify';
import { App } from '../lib/factories/types';

export const AppContext = React.createContext<App>(createApp());
export const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: 'light', isDark: false });
