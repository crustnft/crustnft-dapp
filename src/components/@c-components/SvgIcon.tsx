import { SvgIcon as SvgIconMUI, SvgIconProps } from '@mui/material';

const SvgIcon = ({ children, ...other }: SvgIconProps) => {
  return <SvgIconMUI {...other}>{children}</SvgIconMUI>;
};
export default SvgIcon;
