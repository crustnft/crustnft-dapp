import { Avatar as AvatarMUI, AvatarProps } from '@mui/material';

const Avatar = ({ children, ...other }: AvatarProps) => {
  return <AvatarMUI {...other}>{children}</AvatarMUI>;
};
export default Avatar;
