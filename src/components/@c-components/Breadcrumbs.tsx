import { Breadcrumbs as BreadcrumbsMUI, BreadcrumbsProps } from '@mui/material';

const Breadcrumbs = ({ children, ...other }: BreadcrumbsProps) => {
  return <BreadcrumbsMUI {...other}>{children}</BreadcrumbsMUI>;
};
export default Breadcrumbs;
