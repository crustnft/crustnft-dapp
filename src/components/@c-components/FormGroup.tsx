import { FormGroup as FormGroupMUI, FormGroupProps } from '@mui/material';

const FormGroup = ({ children, ...other }: FormGroupProps) => {
  return <FormGroupMUI {...other}>{children}</FormGroupMUI>;
};
export default FormGroup;
