import { MenuItem as MenuItemMUI, MenuItemProps } from '@mui/material';

const MenuItem = ({ children, ...other }: MenuItemProps) => {
  return <MenuItemMUI {...other}>{children}</MenuItemMUI>;
};
export default MenuItem;
