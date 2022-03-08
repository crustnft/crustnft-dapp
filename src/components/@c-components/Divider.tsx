import { Divider as DividerMUI, DividerProps } from '@mui/material';

const Divider = ({ children, ...other }: DividerProps) => {
  return <DividerMUI {...other}>{children}</DividerMUI>;
};
export default Divider;
