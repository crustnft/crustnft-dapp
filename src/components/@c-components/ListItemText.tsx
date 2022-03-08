import { ListItemText as ListItemTextMUI, ListItemTextProps } from '@mui/material';

const ListItemText = ({ children, ...other }: ListItemTextProps) => {
  return <ListItemTextMUI {...other}>{children}</ListItemTextMUI>;
};
export default ListItemText;
