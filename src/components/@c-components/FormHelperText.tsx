import { FormHelperText as FormHelperTextMUI, FormHelperTextProps } from '@mui/material';

const FormHelperText = ({ children, ...other }: FormHelperTextProps) => {
  return <FormHelperTextMUI {...other}>{children}</FormHelperTextMUI>;
};
export default FormHelperText;
