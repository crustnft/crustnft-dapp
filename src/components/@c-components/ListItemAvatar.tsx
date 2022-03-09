import { ListItemAvatar as ListItemAvatarMUI, ListItemAvatarProps } from '@mui/material';

const ListItemAvatar = ({ children, ...other }: ListItemAvatarProps) => {
  return <ListItemAvatarMUI {...other}>{children}</ListItemAvatarMUI>;
};
export default ListItemAvatar;
