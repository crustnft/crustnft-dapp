import { Theme } from '@mui/material/styles';
import { pxToRem } from 'utils/getFontValue';

export default function Input(theme: Theme) {
  return {
    MuiInput: {
      styleOverrides: {
        root: {
          ...theme.typography.body1,
          borderRadius: pxToRem(12),
          border: 'solid 2px',
          borderColor: theme.palette.grey[300],
          padding: `${pxToRem(13)} ${pxToRem(18)}`,
          width: '100%',
          '&:before, &:after': {
            display: 'none'
          }
        },
        input: {
          padding: 0,
          height: theme.typography.body1.lineHeight
        }
      }
    }
  };
}
