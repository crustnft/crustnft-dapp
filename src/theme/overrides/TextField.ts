import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function TextField(theme: Theme) {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          caretColor: theme.palette.primary.main,
          '& fieldset': {
            border: '2px solid',
            borderRadius: '12px',
            ...theme.palette.textField
          },

          '& input': {
            padding: '15px 18px',
            ...theme.typography.body1
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main
            }
          }
        }
      }
    }
  };
}
