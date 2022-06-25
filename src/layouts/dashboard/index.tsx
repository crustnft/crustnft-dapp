import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardNavbar, { APP_BAR_MAX_WIDTH, APP_BAR_MIN_HEIGHT } from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import Footer from './Footer';

const RootStyle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%'
});

const MainStyle = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: APP_BAR_MAX_WIDTH,
  minHeight: '100%',
  margin: '0 auto',
  flexGrow: 1,
  overflow: 'visible',
  paddingTop: `calc(${APP_BAR_MIN_HEIGHT} + 24px)`,
  paddingBottom: theme.spacing(4)
}));

export default function DashboardLayout() {
  const theme = useTheme();

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
          backgroundColor: 'customBackground.themeBackground'
        }}
      >
        <Outlet />
      </MainStyle>
      <Footer />
    </RootStyle>
  );
}
