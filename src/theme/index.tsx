// @mui
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  Theme as MuiTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider
} from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';
// hooks
import useSettings from '../hooks/useSettings';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
//
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export type Theme = MuiTheme & {
  palette: typeof palette.light;
  typography: typeof typography;
  breakpoints: typeof breakpoints;
  shadows: typeof shadows;
  customShadows: typeof customShadows;
};

export default function ThemeProvider({ children }: Props) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark
    }),
    [isLight, themeDirection]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme as Theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
