import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import Footer from './Footer';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2)
  }
}));

export default function DashboardLayout() {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isWallet = pathname.includes('wallet');

  const { collapseClick } = useCollapseDrawer();
  const [open, setOpen] = useState(false);

  const onOpenSidebar = () => {
    setOpen(true);
  };

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={onOpenSidebar} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle
        sx={{
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex
          }),
          ...(collapseClick && {
            ml: '102px'
          }),
          ...(!isWallet && { backgroundColor: '#F2F4FA' })
        }}
      >
        <Outlet />
        <Footer />
      </MainStyle>
    </RootStyle>
  );
}
