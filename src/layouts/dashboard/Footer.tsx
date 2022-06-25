import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  ClickAwayListener,
  Container,
  Divider,
  Grid,
  Grow,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoLong from 'components/LogoLong';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MIconButton } from '../../components/@material-extend';
import { DISCORD, MEDIUM, TELEGRAM, TWITTER } from '../../constants/socialMedias';
import { APP_BAR_MAX_WIDTH } from './DashboardNavbar';

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
  marginTop: '50px',
  backgroundColor: theme.palette.background.default,
  marginBottom: '-32px'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: APP_BAR_MAX_WIDTH,
  margin: '0 auto'
}));

type networkName = 'Mainnet' | 'Testnet';

export default function MainFooter() {
  const [open, setOpen] = useState(false);
  const [network, setNetwork] = useState<networkName>('Mainnet');
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <RootStyle>
      <Divider />
      <ContentStyle>
        <Container
          maxWidth="lg"
          sx={{
            pt: 3,
            pb: 2,
            [theme.breakpoints.up('sm')]: {
              paddingLeft: '0px',
              paddingRight: '0px'
            }
          }}
        >
          <Grid
            container
            justifyContent={{ xs: 'center', md: 'space-between' }}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Stack direction="row">
                <Stack direction="row" alignItems={mdUp ? 'flex-start' : 'center'}>
                  <LogoLong sx={{ height: '16px' }} />
                </Stack>
                <Stack direction="row" width="100%" justifyContent="flex-end">
                  <Button
                    ref={anchorRef}
                    id="composition-button"
                    variant="text"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    endIcon={<Icon icon="akar-icons:chevron-up" height="14px" />}
                  >
                    {network}
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="top-end"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: 'left top'
                        }}
                      >
                        <Paper>
                          <ClickAwayListener
                            onClickAway={() => {
                              setOpen(false);
                            }}
                          >
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem
                                onClick={() => {
                                  setNetwork('Mainnet');
                                  setOpen(false);
                                }}
                              >
                                Mainnet
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setNetwork('Testnet');
                                  setOpen(false);
                                }}
                              >
                                Testnet
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Stack>
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
      </ContentStyle>
    </RootStyle>
  );
}
