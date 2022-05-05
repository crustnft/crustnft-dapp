import { ThemeOptions } from '@mui/material/styles';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';
export { default as breakpoints } from './breakpoints';
export { default as componentsOverride } from './overrides';

export default function getThemeOptions(themeMode: 'light' | 'dark'): ThemeOptions {
  const isLight = themeMode === 'light';
  return {
    palette: isLight ? palette.light : palette.dark,
    typography,
    shape: { borderRadius: 8 },
    shadows: isLight ? shadows.light : shadows.dark,
    customShadows: isLight ? customShadows.light : customShadows.dark
  };
}
