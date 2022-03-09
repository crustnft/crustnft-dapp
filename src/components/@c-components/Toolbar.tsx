import { Toolbar as ToolbarMUI, ToolbarProps } from '@mui/material';

const Toolbar = ({ children, ...other }: ToolbarProps) => {
  return <ToolbarMUI {...other}>{children}</ToolbarMUI>;
};
export default Toolbar;
