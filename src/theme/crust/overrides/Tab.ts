import { Theme } from '@mui/material/styles';

export default function Tab(theme: Theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          marginRight: 35,
          alignItems: 'flex-start',
          textTransform: 'capitalize',
          ...theme.typography.h6,
          height: theme.typography.h6.lineHeight,
          minWidth: 'auto',
          color: theme.palette.grey[500],
          '&.Mui-selected': {
            color: theme.palette.grey[700]
          }
        }
      }
    }
  };
}
