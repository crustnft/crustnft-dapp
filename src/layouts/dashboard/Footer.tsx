import { Icon } from '@iconify/react';
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoLong from 'components/LogoLong';
import { Link as RouterLink } from 'react-router-dom';
import { MIconButton } from '../../components/@material-extend';
import { DISCORD, MEDIUM, TELEGRAM, TWITTER } from '../../constants/COMMON_VARIABLES';

const LINKS = [
  {
    headline: 'CrustNFT',
    children: [
      { name: 'About us', href: '#' },
      { name: 'Contact us', href: '#' },
      { name: 'FAQs', href: '#' }
    ]
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ]
  },
  {
    headline: 'Contact',
    children: [{ name: 'hi@crustnft.io', href: '#' }]
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  marginTop: '50px',
  backgroundColor: theme.palette.background.default,
  marginBottom: '-32px'
}));

export default function MainFooter() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 3, pb: 2 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Stack alignItems={mdUp ? 'flex-start' : 'center'}>
              <LogoLong sx={{ height: '16px' }} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Empowered by web3 technologies
            </Typography>

            <Box sx={{ mt: 3, mb: { xs: 2, md: 0 } }}>
              <Tooltip key="discord" title="Discord">
                <MIconButton onClick={() => window.open(DISCORD, '_blank')}>
                  <Icon icon="bi:discord" width={24} height={24} />
                </MIconButton>
              </Tooltip>
              <Tooltip key="telegram" title="Telegram">
                <MIconButton onClick={() => window.open(TELEGRAM, '_blank')}>
                  <Icon icon="uim:telegram-alt" width={24} height={24} />
                </MIconButton>
              </Tooltip>
              <Tooltip key="twitter" title="Twitter">
                <MIconButton onClick={() => window.open(TWITTER, '_blank')}>
                  <Icon icon="akar-icons:twitter-fill" width={24} height={24} />
                </MIconButton>
              </Tooltip>
              <Tooltip key="medium" title="Medium">
                <MIconButton onClick={() => window.open(MEDIUM, '_blank')}>
                  <Icon icon="ant-design:medium-square-filled" width={24} height={24} />
                </MIconButton>
              </Tooltip>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="p" variant="overline">
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: 'block' }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 4,
            fontSize: 13,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          © 2022. All rights reserved
        </Typography>
      </Container>
    </RootStyle>
  );
}
