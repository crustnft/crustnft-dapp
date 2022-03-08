import { IconButton as IconButtonMUI, IconButtonProps } from '@mui/material';

const IconButton = ({ children, ...other }: IconButtonProps) => {
  return <IconButtonMUI {...other}>{children}</IconButtonMUI>;
};
export default IconButton;
