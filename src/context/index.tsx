import React from 'react';
import { createApp } from '../lib/factories/AppFactoryAmplify';
import { App } from '../lib/factories/types';
import { AuthProviderInterface } from './AuthProvider';
import { ConfirmProviderInterface } from './ConfirmProvider';
import { ProfileProviderInterface } from './ProfileProvider';

export const AppContext = React.createContext<App>(createApp());
export const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: 'light', isDark: false });
export const AuthContext = React.createContext<AuthProviderInterface>({} as AuthProviderInterface);
export const ConfirmContext = React.createContext<ConfirmProviderInterface>({} as ConfirmProviderInterface)
export const ProfileContext = React.createContext<ProfileProviderInterface>({} as ProfileProviderInterface)