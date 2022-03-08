import { Stepper as StepperMUI, StepperProps } from '@mui/material';

const Stepper = ({ children, ...other }: StepperProps) => {
  return <StepperMUI {...other}>{children}</StepperMUI>;
};
export default Stepper;
