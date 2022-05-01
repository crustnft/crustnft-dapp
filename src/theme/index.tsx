// @mui
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider
} from '@mui/material/styles';
import { ReactNode, useEffect, useMemo, useState } from 'react';
// hooks
import useSettings from '../hooks/useSettings';
import breakpoints from './breakpoints';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};
type ComponentOverrides = (theme: Theme) => Theme['components'];

export const AVAILABLE_THEMES = {
  v0: import('./v0'),
  crust: import('./crust')
};

export default function ThemeProvider({ children }: Props) {
  const { theme: themeName, themeMode, themeDirection } = useSettings();
  const [themeConfigs, setThemeConfigs] = useState<ThemeOptions>();
  const [componentsOverride, setComponentsOverride] = useState<ComponentOverrides>();
  useEffect(() => {
    const name = themeName as keyof typeof AVAILABLE_THEMES;

    if (!AVAILABLE_THEMES[name]) {
      return;
    }
    AVAILABLE_THEMES[name].then(
      ({
        default: getThemeOptions,
        componentsOverride: overrides
      }: {
        default: (themeMode: 'light' | 'dark') => ThemeOptions;
        componentsOverride?: ComponentOverrides;
      }) => {
        setThemeConfigs(getThemeOptions(themeMode));
        if (overrides) {
          setComponentsOverride(overrides);
        }
      }
    );
  }, [themeName, themeMode]);
  const themeOptions: ThemeOptions | undefined = useMemo(
    () =>
      (themeConfigs && {
        ...themeConfigs,
        direction: themeDirection,
        breakpoints
      }) ||
      undefined,
    [themeDirection, themeConfigs]
  );
  if (!themeOptions) {
    return null;
  }
  const theme = createTheme(themeOptions);
  if (componentsOverride) {
    theme.components = componentsOverride(theme);
  }

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
