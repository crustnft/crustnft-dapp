import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Iconify from 'components/Iconify';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  ToolbarProps,
  Typography
} from '../../components/@c-components';
import LogoLong from '../../components/LogoLong';
import ConnectWalletPopover from './ConnectWalletPopover';
import NetworkPopover from './NetworkPopover';

const APPBAR_MINHEIGHT = 64;

interface ToolbarStyleProps extends ToolbarProps {
  trigger?: boolean;
}

const RootStyle = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(32px)',
  WebkitBackdropFilter: 'blur(32px)', // Fix on Mobile
  backgroundColor: 'rgba(242, 244, 250, 0.63)',
  boxShadow: 'none'
}));

const ToolbarStyle = styled(Toolbar)<ToolbarStyleProps>(({ trigger, theme }) => ({
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5)
  },
  '@media all': {
    minHeight: trigger ? 64 : 80
  }
}));

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 64
  });
  return (
    // TODO: Define app bar style in custom-components
    <RootStyle>
      <ToolbarStyle sx={{ minHeight: 200 }} trigger={trigger}>
        <IconButton onClick={onOpenSidebar} sx={{ color: 'text.primary' }}>
          <Icon icon={menu2Fill} />
        </IconButton>

        <Stack spacing={3} direction="row" alignItems="center">
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'inline-flex', pl: { xs: '5px', sm: '15px', lg: '25px' } }}
          >
            <LogoLong />
          </Box>

          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ borderRightWidth: 2, minHeight: '34px' }}
          />

          <Typography variant="h6" color="text.primary" sx={{ opacity: 0.3 }}>
            Wallet
          </Typography>

          <Typography variant="h6" color="text.primary" sx={{ opacity: 0.3 }}>
            Explore
          </Typography>

          <Typography variant="h6" color="text.primary" sx={{ opacity: 0.3 }}>
            How it works
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="bx:plus" />}
            sx={[
              {
                backgroundColor: '#3772FF',
                color: '#ffffff',
                borderRadius: '32px'
              },
              { '& .MuiButton-startIcon': { mr: 1 } }
            ]}
          >
            Create
          </Button>
          <ConnectWalletPopover />
          <Divider orientation="vertical" flexItem />
          <NetworkPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
