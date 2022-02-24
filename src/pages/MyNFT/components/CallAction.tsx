import { Button, Card, CardContent, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { DocIllustration } from '../../../assets';
import useLocales from '../../../hooks/useLocales';
import { PATH_DASHBOARD } from '../../../routes/paths';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

export default function CallAction() {
  const { translate } = useLocales();

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
          {translate(`generalApp.welcome`)},
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          {translate(`generalApp.slogan`)}
        </Typography>

        <Button
          key="learn-more"
          to={PATH_DASHBOARD.about.learnMore}
          component={RouterLink}
          variant="contained"
        >
          {translate(`general.learnMore`)}
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
