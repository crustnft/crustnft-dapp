import { Theme } from '@mui/material/styles';

export default function Tabs(theme: Theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3
        }
      }
    }
  };
}
