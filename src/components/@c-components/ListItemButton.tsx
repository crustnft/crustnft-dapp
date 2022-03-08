import { ListItemButton as ListItemButtonMUI, ListItemButtonProps } from '@mui/material';

const ListItemButton = ({ children, ...other }: ListItemButtonProps) => {
  return <ListItemButtonMUI {...other}>{children}</ListItemButtonMUI>;
};
export default ListItemButton;
