import { Tooltip as TooltipMUI, TooltipProps } from '@mui/material';

const Tooltip = ({ children, ...other }: TooltipProps) => {
  return <TooltipMUI {...other}>{children}</TooltipMUI>;
};
export default Tooltip;
