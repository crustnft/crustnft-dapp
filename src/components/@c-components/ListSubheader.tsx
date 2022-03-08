import { ListSubheader as ListSubheaderMUI, ListSubheaderProps } from '@mui/material';

const ListSubheader = ({ children, ...other }: ListSubheaderProps) => {
  return <ListSubheaderMUI {...other}>{children}</ListSubheaderMUI>;
};
export default ListSubheader;
