import { AppBar as AppBarMUI, AppBarProps } from '@mui/material';

const AppBar = ({ children, ...other }: AppBarProps) => {
  return <AppBarMUI {...other}>{children}</AppBarMUI>;
};
export default AppBar;
