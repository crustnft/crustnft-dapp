import { Box, Container, Link, Typography } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import LogoLong from '../../components/LogoLong';
import MainFooter from './MainFooter';
import MainNavbar from './MainNavbar';

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <ScrollLink to="move_top" spy smooth>
              <LogoLong sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
            </ScrollLink>

            <Typography variant="caption" component="p">
              © All rights reserved
              <br /> made by &nbsp;
              <Link href="https://crustnft.io">crustnft.io</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </>
  );
}
