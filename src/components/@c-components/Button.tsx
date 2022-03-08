import { Button as ButtonMUI, ButtonProps } from '@mui/material';

const Button = ({ children, ...other }: ButtonProps) => {
  return <ButtonMUI {...other}>{children}</ButtonMUI>;
};
export default Button;
