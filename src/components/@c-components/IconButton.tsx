import {
  IconButton as IconButtonMUI,
  IconButtonProps as IconButtonPropsMUI,
  LinkProps
} from '@mui/material';

interface IconButtonProps extends IconButtonPropsMUI {
  target?: string | undefined;
  href?: any;
  component?: React.ForwardRefExoticComponent<LinkProps & any> | string;
}
const IconButton = ({ children, ...other }: IconButtonProps) => {
  return <IconButtonMUI {...other}>{children}</IconButtonMUI>;
};
export default IconButton;
