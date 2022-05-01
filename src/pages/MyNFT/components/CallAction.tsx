import { Box, Button, Link, Stack, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from 'components/Iconify';
import useResponsive from 'hooks/useResponsive';

const WrapStyle = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("./static/call-action/deer.jpg")',
  backgroundPosition: 'center 40%',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: '15px',
  position: 'relative',
  overflow: 'hidden'
}));

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  position: 'relative',
  overflow: 'hidden',
  height: '300px',
  display: 'flex'
}));

export default function CallAction() {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  return (
    <WrapStyle>
      <RootStyle>
        <Stack
          direction="column"
          sx={{ width: '100%', height: '100%', pl: { xs: 0, md: 5 }, pb: { xs: 5, md: 0 } }}
          justifyContent={{ xs: 'flex-end', md: 'center' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          <Typography gutterBottom variant="h2" color="#fff" sx={{ pointerEvents: 'none' }}>
            No Code Required
          </Typography>
          <Typography
            gutterBottom
            color="#fff"
            variant="body2"
            sx={{ pointerEvents: 'none', maxWidth: '300px', fontSize: '1.2rem' }}
            align={isDesktop ? 'left' : 'center'}
          >
            Create & manage your own NFT collection easily in minutes
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link href="#/create-collection">
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
            </Link>
            <Button
              variant="outlined"
              sx={[
                {
                  color: '#fff',
                  borderRadius: '32px',
                  border: theme.palette.header?.walletButtonBorder,
                  borderColor: '#fff'
                }
              ]}
            >
              My Wallet
            </Button>
          </Stack>
        </Stack>
      </RootStyle>
    </WrapStyle>
  );
}
