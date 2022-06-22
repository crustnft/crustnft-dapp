import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardNavbar, { APP_BAR_MAX_WIDTH, APP_BAR_MIN_HEIGHT } from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import Footer from './Footer';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%'
});

const InnerWrapperStyle = styled('div')({
  display: 'flex',
  height: '100%',
  width: '100%',
  maxWidth: APP_BAR_MAX_WIDTH,
  margin: '0 auto',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MIN_HEIGHT + 24,
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
      <InnerWrapperStyle>
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
          <Footer />
        </MainStyle>
      </InnerWrapperStyle>
    </RootStyle>
  );
}
