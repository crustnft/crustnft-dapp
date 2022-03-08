import { FormControlLabel as FormControlLabelMUI, FormControlLabelProps } from '@mui/material';

const FormControlLabel = ({ ...other }: FormControlLabelProps) => {
  return <FormControlLabelMUI {...other} />;
};
export default FormControlLabel;
