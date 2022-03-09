import { Card as CardMUI, CardProps } from '@mui/material';

const Card = ({ children, ...other }: CardProps) => {
  return <CardMUI {...other}>{children}</CardMUI>;
};
export default Card;
