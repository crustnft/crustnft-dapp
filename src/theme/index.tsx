// @mui
import { BreakpointsOptions, CssBaseline } from '@mui/material';
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
  const [breakpoints, setBreakpoints] = useState<BreakpointsOptions>();
  const [componentsOverride, setComponentsOverride] = useState<
    ComponentOverrides | (() => ComponentOverrides)
  >();
  useEffect(() => {
    const name = themeName as keyof typeof AVAILABLE_THEMES;

    if (!AVAILABLE_THEMES[name]) {
      return;
    }
    AVAILABLE_THEMES[name].then(
      ({
        default: getThemeOptions,
        componentsOverride: overrides,
        breakpoints: bps
      }: {
        default: (themeMode: 'light' | 'dark') => ThemeOptions;
        componentsOverride?: ComponentOverrides;
        breakpoints: BreakpointsOptions;
      }) => {
        setThemeConfigs(getThemeOptions(themeMode));
        setBreakpoints(bps);
        if (overrides) {
          // avoid autoexecution of function state
          setComponentsOverride(() => overrides);
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
    [themeDirection, themeConfigs, breakpoints]
  );
  if (!themeOptions) {
    return null;
  }
  const theme = createTheme(themeOptions);
  if (componentsOverride) {
    theme.components = (componentsOverride as ComponentOverrides)(theme);
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
