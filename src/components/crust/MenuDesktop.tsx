import { Link, LinkProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { MenuItemProps, MenuProps } from '../../layouts/dashboard/type';

interface RouterLinkProps extends LinkProps {
  component?: ReactNode;
  to?: string;
  end?: boolean;
}

const LinkStyle = styled(Link)<RouterLinkProps>(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.header?.menuText,
  marginRight: theme.spacing(4.375),
  textDecoration: 'none',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none'
  }
}));

export default function MenuDesktop({ navConfig }: MenuProps) {
  return (
    <Stack direction="row" ml={50}>
      {navConfig.map((link) => (
        <MenuDesktopItem key={link.title} item={link} />
      ))}
    </Stack>
  );
}

type MenuDesktopItemProps = {
  item: MenuItemProps;
};

function MenuDesktopItem({ item }: MenuDesktopItemProps) {
  const { title, path } = item;

  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        '&.active': {
          color: 'text.primary'
        }
      }}
    >
      {title}
    </LinkStyle>
  );
}
