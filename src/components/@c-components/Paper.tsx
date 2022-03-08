import { Paper as PaperMUI, PaperProps } from '@mui/material';

const Paper = ({ children, ...other }: PaperProps) => {
  return <PaperMUI {...other}>{children}</PaperMUI>;
};
export default Paper;
