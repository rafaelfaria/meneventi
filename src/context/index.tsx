import React from 'react';
import { createApp } from '../lib/factories/AppFactoryAmplify';
import { App } from '../lib/factories/types';
import { AuthProviderInterface } from './AuthProvider';

export const AppContext = React.createContext<App>(createApp());
export const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: 'light', isDark: false });
export const AuthContext = React.createContext<AuthProviderInterface>({} as AuthProviderInterface);
