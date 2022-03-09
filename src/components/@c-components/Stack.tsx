import { Stack as StackMUI, StackProps } from '@mui/material';

const Stack = ({ children, ...other }: StackProps) => {
  return <StackMUI {...other}>{children}</StackMUI>;
};

export default Stack;
