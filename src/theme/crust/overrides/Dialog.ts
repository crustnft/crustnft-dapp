import { Theme } from '@mui/material/styles';
import { pxToRem } from 'utils/getFontValue';

export default function Dialog(theme: Theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        root: {},
        paper: {
          minWidth: pxToRem(570),
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.common.white
              : theme.palette.common.black,
          borderRadius: pxToRem(25)
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: { padding: `0 ${pxToRem(70)}` }
      }
    }
  };
}
