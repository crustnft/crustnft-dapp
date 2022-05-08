import React from 'react';
import { SettingsProvider } from '../src/contexts/SettingsContext';
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
    <SettingsProvider>
      <ThemeProvider theme="crust">{Story()}</ThemeProvider>
    </SettingsProvider>
  )
];
