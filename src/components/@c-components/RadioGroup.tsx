import { RadioGroup as RadioGroupMUI, RadioGroupProps } from '@mui/material';

const RadioGroup = ({ children, ...other }: RadioGroupProps) => {
  return <RadioGroupMUI {...other}>{children}</RadioGroupMUI>;
};
export default RadioGroup;
