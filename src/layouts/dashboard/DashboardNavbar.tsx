import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  ToolbarProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from 'components/Iconify';
import useResponsive from 'hooks/useResponsive';
import { Link as RouterLink } from 'react-router-dom';
import LogoIcon from '../../components/LogoIcon';
import LogoLong from '../../components/LogoLong';
import MenuDesktop from './/MenuDesktop';
import ConnectWalletPopover from './ConnectWalletPopover';
import NetworkPopover from './NetworkPopover';
const APPBAR_MIN_HEIGHT = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(32px)',
  WebkitBackdropFilter: 'blur(32px)', // Fix on Mobile
  backgroundColor: theme.palette.header.background,
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

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const isDesktop = useResponsive('up', 'md');
  const notSmall = useResponsive('up', 'sm');
  return (
    <RootStyle>
      <ToolbarStyle sx={{ minHeight: 200 }}>
        <IconButton onClick={onOpenSidebar} sx={{ color: 'header.menuText' }}>
          <Icon icon={menu2Fill} />
        </IconButton>

        <Stack spacing={3} direction="row" alignItems="center">
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'inline-flex', pl: { xs: '5px', sm: '15px', lg: '25px' } }}
          >
            {isDesktop ? <LogoLong /> : <LogoIcon />}
          </Box>

          {isDesktop && (
            <>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ borderRightWidth: 2, minHeight: '34px' }}
              />
              <MenuDesktop
                navConfig={[
                  { title: 'Wallet', path: 'wallet' },
                  { title: 'Explore', path: 'collection-explore' }
                ]}
              />
            </>
          )}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {notSmall ? (
            <Button
              variant="contained"
              startIcon={<Iconify icon="bx:plus" />}
              sx={[
                {
                  backgroundColor: '#3772FF',
                  color: '#ffffff',
                  borderRadius: '32px'
                },
                { '& .MuiButton-startIcon': { mr: 0.5 } }
              ]}
            >
              Create
            </Button>
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
