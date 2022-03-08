import { Dialog as DialogMUI, DialogProps } from '@mui/material';

const Dialog = ({ children, ...other }: DialogProps) => {
  return <DialogMUI {...other}>{children}</DialogMUI>;
};
export default Dialog;
