import { ThemeOptions } from '@mui/material/styles';
import { PALETTE_DARK, PALETTE_LIGHT } from './palettes';
import { TYPOGRAPHY } from './typography';

export const lightThemeOptions: ThemeOptions = {
  palette: PALETTE_LIGHT,
  typography: TYPOGRAPHY
};

export const darkThemeOptions: ThemeOptions = {
  palette: PALETTE_DARK,
  typography: TYPOGRAPHY
};
export default function getThemeOptions(themeMode: 'light' | 'dark'): ThemeOptions {
  return themeMode === 'light' ? lightThemeOptions : darkThemeOptions;
}
