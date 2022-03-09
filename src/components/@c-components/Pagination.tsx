import { Pagination as PaginationMUI, PaginationProps } from '@mui/material';

const Pagination = ({ ...other }: PaginationProps) => {
  return <PaginationMUI {...other} />;
};
export default Pagination;
