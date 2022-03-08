import { Popover as PopoverMUI, PopoverProps } from '@mui/material';

const Popover = ({ children, ...other }: PopoverProps) => {
  return <PopoverMUI {...other}>{children}</PopoverMUI>;
};
export default Popover;
