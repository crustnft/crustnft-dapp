import { Typography as TypographyMUI, TypographyProps } from '@mui/material';

const Typography = ({ children, ...other }: TypographyProps) => {
  return <TypographyMUI {...other}>{children}</TypographyMUI>;
};
export default Typography;
