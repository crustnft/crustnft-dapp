import { Box, Button, Stack, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
// import Trianglify from 'trianglify';
import Trianglify from 'react-trianglify';

const WrapStyle = styled(Box)(({ theme }) => ({
  // backgroundImage: 'url("./static/glassmorphism/trianglify-lowres.png")',
  backgroundSize: '100% ',
  borderRadius: '15px',
  position: 'relative',
  overflow: 'hidden'
}));

const RootStyle = styled(Box)(({ theme }) => ({
  boxShadow: 'none',
  borderRadius: '10px',
  position: 'relative',

  //backgroundColor: theme.palette.primary.lighter,

  // //   backgroundSize: 'cover',
  // [theme.breakpoints.up('md')]: {
  //   height: '100%',
  //   display: 'flex',
  //   textAlign: 'left',
  //   alignItems: 'center',
  //   justifyContent: 'space-between'
  // }
  background: 'rgba(255,255,255,0.1)',
  overflow: 'hidden',
  height: '276px',
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: '1px solid rgba(255,255,255,0.5)',
  borderLeft: '1px solid rgba(255,255,255,0.5)',
  backdropFilter: 'blur(2px)'
}));

export default function CallAction() {
  return (
    <WrapStyle>
      <Box sx={{ position: 'absolute', top: '0px', left: '0px' }}>
        <Trianglify height={276} width={900} cellSize={40} />
      </Box>
      <RootStyle>
        {/* <DocIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      /> */}
        <Box
          component="img"
          sx={{
            height: '100%',
            position: 'absolute',
            left: '0px',
            top: '0px',
            zIndex: '5'
          }}
          src="./static/feature-images/game.png"
        />
        <Stack alignItems="flex-end" sx={{ width: '100%', pr: 3, zIndex: '6' }}>
          <Stack
            sx={{
              maxWidth: '250px'
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              color="rgba(255,255,255,0.4)"
              sx={{ pointerEvents: 'none' }}
            >
              No Code Required
            </Typography>

            <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
              Create your own NFTs collection in minutes
            </Typography>

            <Stack direction="row">
              <Button
                variant="contained"
                sx={{ borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}
              >
                Create Collection
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </RootStyle>
    </WrapStyle>
  );
}
