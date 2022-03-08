import { Badge as BadgeMUI, BadgeProps } from '@mui/material';

const Badge = ({ children, ...other }: BadgeProps) => {
  return <BadgeMUI {...other}>{children}</BadgeMUI>;
};
export default Badge;
