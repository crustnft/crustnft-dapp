import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

export default function Introduction() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });
  return (
    <Box
      sx={{
        position: 'relative',
        '&::after': {
          position: 'absolute',
          content: '""',
          width: '20%',
          zIndex: 1,
          top: 0,
          left: 0,
          height: '100%',
          backgroundSize: '18px 18px',
          backgroundImage: `radial-gradient(${alpha(
            theme.palette.primary.dark,
            0.4
          )} 20%, transparent 20%)`,
          opacity: 0.2
        },
        mb: 5
      }}
    >
      <Box position={'relative'} zIndex={2}>
        <Box sx={{ margin: '0 auto', marginBottom: 2 }} width={{ sm: '100%', lg: '51%' }}>
          <Typography
            variant="h3"
            color="text.header"
            sx={{ textAlign: 'center', textTransform: 'none' }}
            gutterBottom
          >
            Create your own collection like a pro
          </Typography>
          <Typography variant="subtitle1" color="text.tertiary" align={'center'}>
            With CrustNFTs, generate collection, write smart contract and deploy it on blockchain in
            minutes.
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretched', sm: 'center' }}
          justifyContent={'center'}
        >
          <Box marginRight={{ sm: 1 }} width={{ xs: '100%', md: 'auto' }}>
            <Button
              component={'a'}
              variant="text"
              size="large"
              fullWidth={isMd ? false : true}
              href={'/'}
              target={'_blank'}
              sx={{
                backgroundColor: 'background.quaternary',
                padding: '11px 22px',
                boxShadow: (theme) => theme.customShadows.z12
              }}
            >
              <Typography variant="buttonLarge" color="text.primary" textTransform="none">
                Case studies
              </Typography>
            </Button>
          </Box>
          <Box
            marginTop={{ xs: 2, sm: 0 }}
            marginLeft={{ sm: 1 }}
            width={{ xs: '100%', md: 'auto' }}
          >
            <Button
              component={'a'}
              href={'/'}
              variant="outlined"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
              sx={{
                backgroundColor: 'background.primary',
                padding: '11px 22px',
                border: '2px solid',
                borderColor: 'background.quinary',
                boxShadow: (theme) => theme.customShadows.z12,
                '&:hover': {
                  border: '2px solid'
                }
              }}
            >
              <Typography variant="buttonLarge" color="text.primary" textTransform="none">
                View documentation
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
