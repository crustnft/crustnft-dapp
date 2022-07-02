import { Theme } from '..';

// ----------------------------------------------------------------------

export default function Stepper(theme: Theme) {
  return {
    MuiStepper: {
      styleOverrides: {
        root: {
          '& .MuiStepContent-root': {},
          '& .MuiStepConnector-line': {
            borderLeftStyle: 'dashed',
            borderColor: theme.palette.background.quinary
          },
          '& .MuiStepLabel-root': {
            color: theme.palette.text.quaternary,
            '& .MuiStepLabel-iconContainer': {
              padding: 0,
              marginRight: '16px',
              width: '24px',
              height: '24px',
              transform: 'scale(calc(31/24))',
              borderRadius: '50%',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: theme.palette.background.quinary,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '& svg': {
                '&.iconify': { backgroundColor: theme.palette.background.paper },
                '&.MuiStepIcon-root': {
                  margin: '-2px',
                  color: 'transparent',
                  '& text': {
                    fill: theme.palette.text.quaternary
                  },
                  '&.Mui-completed, &.Mui-active': {
                    color: theme.palette.tertiary.lighter,
                    '& text': {
                      fill: theme.palette.tertiary.main,
                      fontWeight: 600
                    }
                  }
                }
              }
            },
            '& h6': {
              color: theme.palette.text.quaternary
            },
            '& .Mui-completed, & .Mui-active': {
              '& >h6': { color: theme.palette.text.primary }
            }
          },
          '& .MuiStep-root.Mui-completed + .MuiStepConnector-root > .MuiStepConnector-line': {
            borderLeftStyle: 'solid',
            borderLeftWidth: '2px',
            borderLeftColor: theme.palette.tertiary.light
          }
        }
      }
    }
  };
}
