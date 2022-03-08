import { Alert as AlertMUI, AlertProps } from '@mui/material';

const Alert = ({ children, ...other }: AlertProps) => {
  return <AlertMUI {...other}>{children}</AlertMUI>;
};
export default Alert;
