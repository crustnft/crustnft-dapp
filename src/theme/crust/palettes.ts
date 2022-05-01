import { PaletteOptions } from '@mui/material/styles';
import { CommonColors } from '@mui/material/styles/createPalette';
import { COLORS, COLORS_DARK, COLORS_LIGHT } from './colors';
const COMMON: Partial<CommonColors> = {
  black: '#000'
};
export const PALETTE_LIGHT: PaletteOptions = {
  type: 'light',
  primary: COLORS_LIGHT.primary,
  // accent
  secondary: COLORS_LIGHT.accent,
  // secondary
  secondary2: COLORS_LIGHT.secondary,
  background: COLORS_LIGHT.background,
  text: COLORS_LIGHT.text,
  error: COLORS_LIGHT.error,
  warning: COLORS_LIGHT.warning,
  success: COLORS_LIGHT.success,
  grey: COLORS.grey,
  common: COMMON
};
export const PALETTE_DARK: PaletteOptions = {
  type: 'dark',
  primary: COLORS_DARK.primary,
  // accent
  secondary: COLORS_DARK.accent,
  // secondary
  secondary2: COLORS_DARK.secondary,
  background: COLORS_DARK.background,
  text: COLORS_DARK.text,
  error: COLORS_LIGHT.error,
  warning: COLORS_DARK.warning,
  success: COLORS_DARK.success,
  grey: COLORS.grey,
  common: COMMON
};
const palettes = {
  light: PALETTE_LIGHT,
  dark: PALETTE_DARK
};
export default palettes;
