import { Color } from '@mui/material';

/// COLORS
export const GREY_HEX: Partial<Color> = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24'
};

export const PRIMARY_HEX = {
  dark: '#DF7B00',
  light: '#FBC27C',
  lighter: '#FBEDDD',
  main: '#FF8C00',
  neutral: '#FDA232'
};
export const SECONDARY_HEX = {
  dark: '#0E2E4E',
  light: '#9EB6CE',
  lighter: '#E3EBF3',
  main: '#143F6B',
  neutral: '#58799B'
};
export const ACCENT_HEX = {
  dark: '#329BC9',
  light: '#ACDDF1',
  lighter: '#E5F2F8',
  main: '#3CB3E7',
  neutral: '#75C8ED'
};
export const TERTIARY = {
  dark: '#DC6C5D',
  light: '#FABBB2',
  lighter: '#F8EDEC',
  main: '#FE7E6D',
  neutral: '#FC9789'
};
export const ERROR_HEX = '#FF4842';
export const WARNING_HEX = '#F1B007';
export const SUCCESS_HEX = '#1CD1A6';
export const BODY_LIGHT_HEX = '#FFFFFF';
export const BODY_DARK_HEX = '#161C24';
export const PAPER_RGBA = 'rgba(145, 158, 171, 0.08)';

export const COLORS = {
  grey: GREY_HEX,
  error: ERROR_HEX,
  success: SUCCESS_HEX,
  primary: {
    contrastText: GREY_HEX[0],
    dark: PRIMARY_HEX.neutral,
    darker: PRIMARY_HEX.dark,
    light: PRIMARY_HEX.light,
    lighter: PRIMARY_HEX.lighter,
    main: PRIMARY_HEX.main
  },
  accent: {
    contrastText: GREY_HEX[0],
    dark: ACCENT_HEX.neutral,
    darker: ACCENT_HEX.dark,
    light: ACCENT_HEX.light,
    lighter: ACCENT_HEX.lighter,
    main: ACCENT_HEX.main
  },
  secondary: {
    contrastText: GREY_HEX[0],
    dark: SECONDARY_HEX.neutral,
    darker: SECONDARY_HEX.dark,
    light: SECONDARY_HEX.light,
    lighter: SECONDARY_HEX.lighter,
    main: SECONDARY_HEX.main
  }
};
export const COLORS_FEEDBACK = {
  error: {
    contrastText: GREY_HEX[0],
    dark: ERROR_HEX,
    darker: ERROR_HEX,
    light: ERROR_HEX,
    lighter: ERROR_HEX,
    main: ERROR_HEX
  },
  warning: {
    contrastText: GREY_HEX[0],
    dark: WARNING_HEX,
    darker: WARNING_HEX,
    light: WARNING_HEX,
    lighter: WARNING_HEX,
    main: WARNING_HEX
  },
  success: {
    contrastText: GREY_HEX[0],
    dark: SUCCESS_HEX,
    darker: SUCCESS_HEX,
    light: SUCCESS_HEX,
    lighter: SUCCESS_HEX,
    main: SUCCESS_HEX
  }
};
export const COLORS_LIGHT = {
  ...COLORS,
  ...COLORS_FEEDBACK,
  background: {
    default: BODY_LIGHT_HEX,
    paper: PAPER_RGBA
  },
  text: {
    primary: GREY_HEX[900],
    secondary: GREY_HEX[600],
    disabled: GREY_HEX[500]
  }
};
export const COLORS_DARK = {
  ...COLORS,
  ...COLORS_FEEDBACK,
  background: {
    default: BODY_DARK_HEX,
    paper: PAPER_RGBA
  },
  text: {
    primary: GREY_HEX[0],
    secondary: GREY_HEX[300],
    disabled: GREY_HEX[400]
  }
};
