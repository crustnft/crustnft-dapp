import { ButtonBase as ButtonBaseMUI, ButtonBaseProps } from '@mui/material';

const ButtonBase = ({ children, ...other }: ButtonBaseProps) => {
  return <ButtonBaseMUI {...other}>{children}</ButtonBaseMUI>;
};
export default ButtonBase;
