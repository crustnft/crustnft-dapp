import { TypographyOptions } from '@mui/material/styles/createTypography';
import { pxToRem } from 'utils/getFontValue';
declare module '@mui/material/styles' {
  interface PaletteOptions {
    type?: string;
    secondary2?: {
      main: React.CSSProperties['color'];
      contrastText: React.CSSProperties['color'];
      light: React.CSSProperties['color'];
      dark: React.CSSProperties['color'];
      darker: React.CSSProperties['color'];
      lighter: React.CSSProperties['color'];
    };
  }
}
/// FONTS
export const FONT_DEFAULT = 'Public Sans';
export const TYPOGRAPHY: TypographyOptions = {
  body2: {
    fontSize: pxToRem(14)
  },
  body1: {
    fontSize: pxToRem(16)
  },
  fontFamily: FONT_DEFAULT
};
