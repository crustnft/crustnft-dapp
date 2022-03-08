import { TextField as TextFieldMUI, TextFieldProps } from '@mui/material';

const TextField = ({ children, ...other }: TextFieldProps) => {
  return <TextFieldMUI {...other}>{children}</TextFieldMUI>;
};
export default TextField;
