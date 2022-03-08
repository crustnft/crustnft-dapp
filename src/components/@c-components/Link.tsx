import { Link as LinkMUI, LinkProps } from '@mui/material';

const Link = ({ children, ...other }: LinkProps) => {
  return <LinkMUI {...other}>{children}</LinkMUI>;
};
export default Link;
