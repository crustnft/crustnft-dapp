import { Drawer as DrawerMUI, DrawerProps } from '@mui/material';

const Drawer = ({ children, ...other }: DrawerProps) => {
  return <DrawerMUI {...other}>{children}</DrawerMUI>;
};
export default Drawer;
