// @mui
import { Theme } from '@mui/material/styles';
// theme
import { ColorSchema } from '../palette';
//
import { AccentIcon, ErrorIcon, SuccessIcon, WarningIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Alert(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const standardStyle = (color: ColorSchema) => ({
    color: theme.palette[color][isLight ? 'dark' : 'lighter'],
    backgroundColor: theme.palette[color][isLight ? 'lighter' : 'dark'],
    '& .MuiAlert-icon': {
      color: theme.palette[color][isLight ? 'main' : 'light']
    }
  });

  const filledStyle = (color: ColorSchema) => ({
    color: theme.palette[color].contrastText
  });

  const outlinedStyle = (color: ColorSchema) => ({
    color: theme.palette[color][isLight ? 'dark' : 'lighter'],
    border: `solid 1px ${theme.palette[color][isLight ? 'light' : 'dark']}`,
    backgroundColor: theme.palette[color][isLight ? 'lighter' : 'dark'],
    '& .MuiAlert-icon': {
      color: theme.palette[color][isLight ? 'main' : 'light']
    }
  });

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          accent: <AccentIcon />,
          success: <SuccessIcon />,
          warning: <WarningIcon />,
          error: <ErrorIcon />
        }
      },

      styleOverrides: {
        message: {
          '& .MuiAlertTitle-root': {
            marginBottom: theme.spacing(0.5)
          }
        },
        action: {
          '& button:not(:first-of-type)': {
            marginLeft: theme.spacing(1)
          }
        },

        standardAccent: standardStyle('accent'),
        standardSuccess: standardStyle('success'),
        standardWarning: standardStyle('warning'),
        standardError: standardStyle('error'),

        filledAccent: filledStyle('accent'),
        filledSuccess: filledStyle('success'),
        filledWarning: filledStyle('warning'),
        filledError: filledStyle('error'),

        outlinedAccent: outlinedStyle('accent'),
        outlinedSuccess: outlinedStyle('success'),
        outlinedWarning: outlinedStyle('warning'),
        outlinedError: outlinedStyle('error')
      }
    }
  };
}
