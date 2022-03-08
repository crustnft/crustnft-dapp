import { CardHeader as CardHeaderMUI, CardHeaderProps } from '@mui/material';

const CardHeader = ({ children, ...other }: CardHeaderProps) => {
  return <CardHeaderMUI {...other}>{children}</CardHeaderMUI>;
};
export default CardHeader;
