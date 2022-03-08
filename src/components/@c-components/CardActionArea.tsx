import { CardActionArea as CardActionAreaMUI, CardActionAreaProps } from '@mui/material';

const CardActionArea = ({ children, ...other }: CardActionAreaProps) => {
  return <CardActionAreaMUI {...other}>{children}</CardActionAreaMUI>;
};

export default CardActionArea;
