import { Collapse as CollapseMUI, CollapseProps } from '@mui/material';

const Collapse = ({ children, ...other }: CollapseProps) => {
  return <CollapseMUI {...other}>{children}</CollapseMUI>;
};
export default Collapse;
