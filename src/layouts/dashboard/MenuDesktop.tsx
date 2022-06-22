import { Link, LinkProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { MenuItemProps, MenuProps } from './type';

interface RouterLinkProps extends LinkProps {
  component?: ReactNode;
  to?: string;
  end?: boolean;
}

const LinkStyle = styled(Link)<RouterLinkProps>(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.header.menuText,
  marginRight: theme.spacing(5),
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
    <Stack direction="row" sx={{ ml: '50px !important' }}>
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

  if (title === 'Documentation') {
    return (
      <LinkStyle href={path} target="_blank" rel="noopener" sx={{}}>
        {title}
      </LinkStyle>
    );
  }

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
