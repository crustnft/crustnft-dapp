import { useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container, Divider, Stack, Typography } from '../../components/@c-components';

const LINKS = [
  {
    headline: 'Switchswap',
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
    children: [{ name: 'hi@switchswap.io', href: '#' }]
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  marginTop: '20px',
  marginBottom: '-50px',
  mx: '-50px',
  backgroundColor: theme.palette.background.default
}));

export default function MainFooter() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: '50px' }}
        >
          <Typography variant="caption">©2022 CrustNFT. All rights reserved. </Typography>
          <Typography variant="caption">Home page</Typography>
        </Stack>
      </Container>
    </RootStyle>
  );
}
