import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React, { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from '../src/contexts/JWTContext';
import { SettingsProvider } from '../src/contexts/SettingsContext';
import { WalletProvider } from '../src/contexts/WalletContext';
import { Web3ContextProvider } from '../src/contexts/Web3Context';
import { store } from '../src/redux/store';
import ThemeProvider from '../src/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
export const decorators = [
  (Story) => (
    <StrictMode>
      <AuthProvider>
        <HelmetProvider>
          <ReduxProvider store={store}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <WalletProvider>
                <Web3ContextProvider>
                  <SettingsProvider>
                    <ThemeProvider theme="crust">{Story()}</ThemeProvider>
                  </SettingsProvider>
                </Web3ContextProvider>
              </WalletProvider>
            </LocalizationProvider>
          </ReduxProvider>
        </HelmetProvider>
      </AuthProvider>
    </StrictMode>
  )
];
