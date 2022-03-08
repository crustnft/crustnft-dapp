import { List as ListMUI, ListProps } from '@mui/material';

const List = ({ children, ...other }: ListProps) => {
  return <ListMUI {...other}>{children}</ListMUI>;
};
export default List;
