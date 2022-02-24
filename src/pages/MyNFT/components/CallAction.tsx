import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../routes/paths';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',

  //backgroundColor: theme.palette.primary.lighter,

  backgroundImage: 'url("./static/glassmorphism/colorful.jfif")',
  // //   backgroundSize: 'cover',
  // [theme.breakpoints.up('md')]: {
  //   height: '100%',
  //   display: 'flex',
  //   textAlign: 'left',
  //   alignItems: 'center',
  //   justifyContent: 'space-between'
  // }
  height: '276px',
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

export default function CallAction() {
  return (
    <RootStyle>
      {/* <DocIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      /> */}
      <Grid container>
        <Grid item xs={4}>
          <Box
            component="img"
            sx={{
              height: '100%',
              position: 'absolute',
              left: '0px',
              top: '0px',
              zIndex: '-1'
            }}
            src="./static/feature-images/call-action.png"
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent
            sx={{
              color: 'grey.800'
            }}
          >
            <Typography gutterBottom variant="h4">
              Create Now
            </Typography>

            <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
              Create your own NFTs collection without code.
            </Typography>

            <Button
              key="learn-more"
              to={PATH_DASHBOARD.about.learnMore}
              component={RouterLink}
              variant="contained"
            >
              Create Collection
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
