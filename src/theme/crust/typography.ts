import { TypographyOptions } from '@mui/material/styles/createTypography';
import { pxToRem } from 'utils/getFontValue';
declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    buttonXl?: TypographyStyleOptions;
    buttonL?: TypographyStyleOptions;
    buttonM?: TypographyStyleOptions;
    buttonS?: TypographyStyleOptions;
  }
  interface Typography {
    buttonXl?: TypographyStyleOptions;
    buttonL?: TypographyStyleOptions;
    buttonM?: TypographyStyleOptions;
    buttonS?: TypographyStyleOptions;
  }
}
/// FONTS
export const FONT_DEFAULT = 'Public Sans';
export const FONT_SIZE = {
  h1: pxToRem(64),
  h2: pxToRem(48),
  h3: pxToRem(32),
  h4: pxToRem(24),
  h5: pxToRem(20),
  h6: pxToRem(18),
  subtitle1: pxToRem(16),
  subtitle2: pxToRem(14),
  body1: pxToRem(16),
  body2: pxToRem(14),
  caption: pxToRem(12),
  overline: pxToRem(12),
  buttonXl: pxToRem(18),
  buttonL: pxToRem(15),
  buttonM: pxToRem(14),
  buttonS: pxToRem(13)
};
export const FONT_WEIGHT = {
  title: 600,
  subtitle: 600,
  body: 500,
  caption: 500,
  overline: 700,
  button: 700
};
export const FONT_HEIGHT = {
  h1: pxToRem(80),
  h2: pxToRem(64),
  h3: pxToRem(48),
  h4: pxToRem(36),
  h5: pxToRem(30),
  h6: pxToRem(28),
  subtitle1: pxToRem(24),
  subtitle2: pxToRem(22),
  body1: pxToRem(24),
  body2: pxToRem(22),
  caption: pxToRem(18),
  overline: pxToRem(18),
  buttonXl: pxToRem(32),
  buttonL: pxToRem(26),
  buttonM: pxToRem(24),
  buttonS: pxToRem(22)
};
export const FONT_SPACING = {
  title: 'unset',
  subtitle: 'unset',
  body: 'unset',
  caption: 'unset',
  overline: 1.2,
  button: 'unset'
};
export const TYPOGRAPHY: TypographyOptions = {
  h1: {
    fontSize: FONT_SIZE.h1,
    lineHeight: FONT_HEIGHT.h1,
    letterSpacing: FONT_SPACING.title,
    fontWeight: FONT_WEIGHT.title
  },
  h2: {
    fontSize: FONT_SIZE.h2,
    lineHeight: FONT_HEIGHT.h2,
    letterSpacing: FONT_SPACING.title,
    fontWeight: FONT_WEIGHT.title
  },
  h3: {
    fontSize: FONT_SIZE.h3,
    lineHeight: FONT_HEIGHT.h3,
    letterSpacing: FONT_SPACING.title,
    fontWeight: FONT_WEIGHT.title
  },
  h4: {
    fontSize: FONT_SIZE.h4,
    lineHeight: FONT_HEIGHT.h4,
    letterSpacing: FONT_SPACING.title,
    fontWeight: FONT_WEIGHT.title
  },
  h5: {
    fontSize: FONT_SIZE.h5,
    lineHeight: FONT_HEIGHT.h5,
    letterSpacing: FONT_SPACING.title,
    fontWeight: FONT_WEIGHT.title
  },
  h6: {
    fontSize: FONT_SIZE.h6,
    lineHeight: FONT_HEIGHT.h6,
    letterSpacing: FONT_SPACING.title,
    fontWeight: FONT_WEIGHT.title
  },
  subtitle1: {
    fontSize: FONT_SIZE.subtitle1,
    lineHeight: FONT_HEIGHT.subtitle1,
    letterSpacing: FONT_SPACING.subtitle,
    fontWeight: FONT_WEIGHT.subtitle
  },
  subtitle2: {
    fontSize: FONT_SIZE.subtitle2,
    lineHeight: FONT_HEIGHT.subtitle2,
    letterSpacing: FONT_SPACING.subtitle,
    fontWeight: FONT_WEIGHT.subtitle
  },
  body2: {
    fontSize: pxToRem(14)
  },
  body1: {
    fontSize: pxToRem(16)
  },
  buttonXl: {
    fontSize: FONT_SIZE.buttonXl,
    lineHeight: FONT_HEIGHT.buttonXl,
    letterSpacing: FONT_SPACING.button,
    fontWeight: FONT_WEIGHT.button
  },
  buttonL: {
    fontSize: FONT_SIZE.buttonL,
    lineHeight: FONT_HEIGHT.buttonL,
    letterSpacing: FONT_SPACING.button,
    fontWeight: FONT_WEIGHT.button
  },
  buttonM: {
    fontSize: FONT_SIZE.buttonM,
    lineHeight: FONT_HEIGHT.buttonM,
    letterSpacing: FONT_SPACING.button,
    fontWeight: FONT_WEIGHT.button
  },
  buttonS: {
    fontSize: FONT_SIZE.buttonS,
    lineHeight: FONT_HEIGHT.buttonS,
    letterSpacing: FONT_SPACING.button,
    fontWeight: FONT_WEIGHT.button
  },
  fontFamily: FONT_DEFAULT
};
