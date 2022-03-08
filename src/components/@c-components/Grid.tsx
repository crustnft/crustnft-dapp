import { Grid as GridMUI, GridProps } from '@mui/material';

const Grid = ({ children, ...other }: GridProps) => {
  return <GridMUI {...other}>{children}</GridMUI>;
};

export default Grid;
