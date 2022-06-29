import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import { AppBar, Box, Button, IconButton, Link, Stack, Toolbar, ToolbarProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from 'components/Iconify';
import useResponsive from 'hooks/useResponsive';
import useWeb3 from 'hooks/useWeb3';
import { Link as RouterLink } from 'react-router-dom';
import LogoIcon from '../../components/LogoIcon';
import LogoLong from '../../components/LogoLong';
import MenuDesktop from './/MenuDesktop';
import ConnectWalletPopover from './ConnectWalletPopover';
import NetworkPopover from './NetworkPopover';
const APPBAR_MIN_HEIGHT = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.header.background,
  boxShadow: '0px 8px 16px rgba(145, 158, 171, 0.16)'
}));

export const APP_BAR_MIN_HEIGHT = '64px';
export const APP_BAR_MAX_WIDTH = '1150px';

const ToolbarStyle = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5)
  },
  '@media all': {
    minHeight: APPBAR_MIN_HEIGHT,
    padding: '0px'
  }
}));

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const isDesktop = useResponsive('up', 'md');
  const notSmall = useResponsive('up', 'sm');
  const { active } = useWeb3();
  return (
    <RootStyle>
      <ToolbarStyle
        sx={{
          minHeight: APP_BAR_MIN_HEIGHT,
          display: 'flex',
          height: '100%',
          width: '100%',
          maxWidth: APP_BAR_MAX_WIDTH,
          margin: '0 auto'
        }}
      >
        <IconButton onClick={onOpenSidebar} sx={{ color: 'header.menuText' }}>
          <Icon icon={menu2Fill} />
        </IconButton>

        <Stack spacing={3} direction="row" alignItems="center">
          <Box
            component={RouterLink}
            to={active ? '/dashboard' : '/wallet'}
            sx={{ display: 'inline-flex', pl: { xs: '5px', sm: '15px', lg: '25px' } }}
          >
            {isDesktop ? <LogoLong /> : <LogoIcon />}
          </Box>

          {isDesktop && (
            <MenuDesktop
              navConfig={[
                active
                  ? { title: 'Dashboard', path: 'dashboard' }
                  : { title: 'Wallet', path: 'wallet' },
                { title: 'Explore', path: 'collection-explore' }
              ]}
            />
          )}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <Link href="#/create-collection" underline="none">
            {notSmall ? (
              <Button
                variant="contained"
                startIcon={<Iconify icon="bx:plus" />}
                sx={[
                  (theme) => theme.palette.customCSS.buttonHeader,
                  {
                    color: 'grey.0',
                    boxShadow: (theme) => theme.customShadows.z8,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    '& .MuiButton-startIcon': { mr: 0.5 }
                  }
                ]}
              >
                Create
              </Button>
            ) : (
              <IconButton>
                <Iconify icon="fluent:channel-add-28-regular" />
              </IconButton>
            )}
          </Link>
          <ConnectWalletPopover />
          <NetworkPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
