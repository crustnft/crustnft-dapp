import { Button, Card, CardContent, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { DocIllustration } from '../../../assets';
import { PATH_DASHBOARD } from '../../../routes/paths';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  backgroundImage:
    'url("https://media.istockphoto.com/vectors/abstract-blur-background-vector-id1077584186")',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

export default function CallAction() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
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

      <DocIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
