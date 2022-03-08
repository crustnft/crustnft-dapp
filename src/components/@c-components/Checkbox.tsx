import { Checkbox as CheckboxMUI, CheckboxProps } from '@mui/material';

const Checkbox = ({ ...other }: CheckboxProps) => {
  return <CheckboxMUI {...other} />;
};
export default Checkbox;
