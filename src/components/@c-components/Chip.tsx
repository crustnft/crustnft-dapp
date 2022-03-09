import { Chip as ChipMUI, ChipProps } from '@mui/material';

const Chip = ({ children, ...other }: ChipProps) => {
  return <ChipMUI {...other}>{children}</ChipMUI>;
};
export default Chip;
