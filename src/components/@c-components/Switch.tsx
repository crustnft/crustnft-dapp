import { Switch as SwitchMUI, SwitchProps } from '@mui/material';

const Switch = ({ ...other }: SwitchProps) => {
  return <SwitchMUI {...other} />;
};
export default Switch;
