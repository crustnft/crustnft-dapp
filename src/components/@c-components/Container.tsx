import { Container as ContainerMUI, ContainerProps } from '@mui/material';

const Container = ({ children, ...other }: ContainerProps) => {
  return <ContainerMUI {...other}>{children}</ContainerMUI>;
};
export default Container;
