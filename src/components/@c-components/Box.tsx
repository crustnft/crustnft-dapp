import { Box as BoxMUI, BoxProps } from '@mui/material';

const Box = ({ children, ...other }: BoxProps) => {
  return <BoxMUI {...other}>{children}</BoxMUI>;
};

export default Box;
