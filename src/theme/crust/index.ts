import { ThemeOptions } from '@mui/material/styles';
import { COLORS } from './colors';
import { PALETTE_DARK, PALETTE_LIGHT } from './palettes';
import { SHADOWS } from './shadows';
import { TYPOGRAPHY } from './typography';
declare module '@mui/material/styles' {
  export interface Theme {
    colors?: typeof COLORS;
  }
  export interface ThemeOptions {
    colors?: typeof COLORS;
  }
}
const commonOptions = {
  name: 'crust',
  colors: COLORS
};
export const lightThemeOptions: ThemeOptions = {
  ...commonOptions,
  palette: PALETTE_LIGHT,
  typography: TYPOGRAPHY,
  customShadows: SHADOWS.light
};
export const darkThemeOptions: ThemeOptions = {
  ...commonOptions,
  palette: PALETTE_DARK,
  typography: TYPOGRAPHY,
  customShadows: SHADOWS.dark
};
export { default as breakpoints } from './breakpoints';
export { default as componentsOverride } from './overrides';
export default function getThemeOptions(themeMode: 'light' | 'dark'): ThemeOptions {
  return themeMode === 'light' ? lightThemeOptions : darkThemeOptions;
}
