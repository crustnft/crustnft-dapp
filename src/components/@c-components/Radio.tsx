import { Radio as RadioMUI, RadioProps } from '@mui/material';

const Radio = ({ ...other }: RadioProps) => {
  return <RadioMUI {...other} />;
};
export default Radio;
