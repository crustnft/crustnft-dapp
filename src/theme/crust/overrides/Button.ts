import { Theme } from '@mui/material/styles';
import { pxToRem } from 'utils/getFontValue';

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: pxToRem(8),
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none'
          }
        },
        sizeLarge: {
          ...theme.typography.buttonL!,
          padding: `${pxToRem(11)} ${pxToRem(22)}`
        },
        sizeMedium: {
          ...theme.typography.buttonM!,
          padding: `${pxToRem(11)} ${pxToRem(22)}`
        },
        sizeSmall: {
          ...theme.typography.buttonS!,
          padding: `${pxToRem(11)} ${pxToRem(22)}`
        },
        containedPrimary: {
          color: theme.palette.primary.contrastText
        }
      }
    }
  };
}
