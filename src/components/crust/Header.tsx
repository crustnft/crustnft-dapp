import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import { AppBar, Box, IconButton, Link, Stack, Toolbar, ToolbarProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from 'components/Iconify';
import useResponsive from 'hooks/useResponsive';
import { Link as RouterLink } from 'react-router-dom';
import LogoIcon from '../../components/LogoIcon';
import ConnectWalletPopover from './ConnectWalletPopover';
import CrustButton from './CrustButton';
import LogoFull from './LogoFull';
import MenuDesktop from './MenuDesktop';
import NetworkPopover from './NetworkPopover';
const APPBAR_MIN_HEIGHT = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(32px)',
  WebkitBackdropFilter: 'blur(32px)', // Fix on Mobile
  backgroundColor: theme.palette.grey[0],
  boxShadow: 'none'
}));

const ToolbarStyle = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5)
  },
  '@media all': {
    minHeight: APPBAR_MIN_HEIGHT
  }
}));

type HeaderProps = {
  onOpenSidebar: VoidFunction;
};

export default function Header({ onOpenSidebar }: HeaderProps) {
  const isDesktop = useResponsive('up', 'md');
  const notSmall = useResponsive('up', 'sm');
  return (
    <RootStyle>
      <ToolbarStyle sx={{ minHeight: 200 }}>
        <IconButton onClick={onOpenSidebar}>
          <Icon icon={menu2Fill} />
        </IconButton>
        <Stack spacing={3} direction="row" alignItems="center">
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'inline-flex',
              pl: { xs: '5px', sm: '10px', lg: '10px' }
            }}
          >
            {isDesktop ? <LogoFull /> : <LogoIcon />}
          </Box>

          {isDesktop && (
            <MenuDesktop
              navConfig={[
                { title: 'Wallet', path: 'wallet' },
                { title: 'Explore', path: 'collection-explore' }
              ]}
            />
          )}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {notSmall ? (
            <Link href="#/create-collection" sx={{ textDecoration: 'none' }}>
              <CrustButton
                size="small"
                variant="contained"
                startIcon={<Iconify icon="bx:plus" />}
                color="primary"
              >
                Create
              </CrustButton>
            </Link>
          ) : (
            <IconButton>
              <Iconify icon="fluent:channel-add-28-regular" />
            </IconButton>
          )}
          <ConnectWalletPopover />
          <NetworkPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
