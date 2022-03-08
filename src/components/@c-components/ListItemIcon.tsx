import { ListItemIcon as ListItemIconMUI, ListItemIconProps } from '@mui/material';

const ListItemIcon = ({ children, ...other }: ListItemIconProps) => {
  return <ListItemIconMUI {...other}>{children}</ListItemIconMUI>;
};
export default ListItemIcon;
