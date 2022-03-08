import { ListItem as ListItemMUI, ListItemProps } from '@mui/material';

const ListItem = ({ children, ...other }: ListItemProps) => {
  return <ListItemMUI {...other}>{children}</ListItemMUI>;
};
export default ListItem;
