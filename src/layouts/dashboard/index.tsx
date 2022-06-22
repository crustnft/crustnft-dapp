import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import Footer from './Footer';

const APP_BAR = 64;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR + 24,
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
        <Footer />
      </MainStyle>
    </RootStyle>
  );
}
