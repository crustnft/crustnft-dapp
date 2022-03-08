import { Fab as FabMUI, FabProps } from '@mui/material';

const Fab = ({ children, ...other }: FabProps) => {
  return <FabMUI {...other}>{children}</FabMUI>;
};
export default Fab;
