import { Menu as MenuMUI, MenuProps } from '@mui/material';

const Menu = ({ children, ...other }: MenuProps) => {
  return <MenuMUI {...other}>{children}</MenuMUI>;
};
export default Menu;
