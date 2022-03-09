import { Skeleton as SkeletonMUI, SkeletonProps } from '@mui/material';

const Skeleton = ({ children, ...other }: SkeletonProps) => {
  return <SkeletonMUI {...other}>{children}</SkeletonMUI>;
};
export default Skeleton;
