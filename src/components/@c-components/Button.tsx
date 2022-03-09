import { Button as ButtonMUI, ButtonProps as ButtonPropsMUI, LinkProps } from '@mui/material';

interface ButtonProps extends ButtonPropsMUI {
  target?: string | undefined;
  to?: string | undefined;
  href?: any;
  component?: React.ForwardRefExoticComponent<LinkProps & any> | string;
}

const Button = ({ children, ...other }: ButtonProps) => {
  return <ButtonMUI {...other}>{children}</ButtonMUI>;
};
export default Button;
