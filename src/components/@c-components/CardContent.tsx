import { CardContent as CardContentMUI, CardContentProps } from '@mui/material';

const CardContent = ({ children, ...other }: CardContentProps) => {
  return <CardContentMUI {...other}>{children}</CardContentMUI>;
};
export default CardContent;
