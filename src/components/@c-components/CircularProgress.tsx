import { CircularProgress as CircularProgressMUI, CircularProgressProps } from '@mui/material';

const CircularProgress = ({ ...other }: CircularProgressProps) => {
  return <CircularProgressMUI {...other} />;
};
export default CircularProgress;
