import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from 'components/Iconify';
import useSettings from 'hooks/useSettings';
import useWeb3 from 'hooks/useWeb3';
import React, { useRef, useState } from 'react';
import MenuPopover from '../../components/MenuPopover';
const ConnectWalletPopover = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const { themeMode, onToggleMode } = useSettings();
  const {
    active: walletIsConnected,
    activate,
    account,
    deactivate,
    connectedChain,
    balance,
    providerInfo
  } = useWeb3();

  const [openWalletInfo, setOpenWalletInfo] = useState(false);
  const walletInfoAnchorRef = useRef(null);

  const handleWalletModalOpen = async () => {
    activate();
  };

  const handleWalletInfoOpen = () => {
    setOpenWalletInfo(true);
  };

  const handleWalletInfoClose = () => {
    setOpenWalletInfo(false);
  };

  const handleDisconnectWallet = () => {
    deactivate();
    setOpenWalletInfo(false);
  };

  const handleDarkMode = () => {
    onToggleMode();
  };
  return (
    <>
      {smUp && !walletIsConnected && (
        <Button
          variant="outlined"
          onClick={handleWalletModalOpen}
          sx={[
            {
              color: 'text.primary',
              borderRadius: '32px',
              border: theme.palette.header.walletButtonBorder,
              borderColor: theme.palette.header.menuText
            }
          ]}
        >
          My Wallet
        </Button>
      )}

      {!smUp && !walletIsConnected && (
        <ButtonBase onClick={handleWalletModalOpen}>
          <SvgIcon>
            <Icon icon="fontisto:wallet" color={theme.palette.text.secondary} />
          </SvgIcon>
        </ButtonBase>
      )}

      {walletIsConnected && (
        <ButtonBase
          ref={walletInfoAnchorRef}
          onClick={handleWalletInfoOpen}
          sx={{
            border: theme.palette.header.walletButtonBorder,
            borderColor: theme.palette.header.menuText,
            borderRadius: '20px',
            height: '100%',
            padding: '2px',
            pr: '10px',
            overflow: 'hidden'
          }}
        >
          <Stack direction="row" alignItems="center" sx={{ height: '100%' }} spacing={1}>
            <Avatar
              alt="Dog Avatar"
              src="https://avatarfiles.alphacoders.com/865/thumb-86573.jpg"
              sx={{ width: 28, height: 28 }}
            />
            <Typography color="text.primary" variant="subtitle2" sx={{ lineHeight: 0 }}>
              {balance}
            </Typography>

            <Typography variant="subtitle2" color="#45B26B" sx={{ lineHeight: 0 }}>
              {connectedChain?.currencySymbol}
            </Typography>
          </Stack>
        </ButtonBase>
      )}

      <MenuPopover
        open={openWalletInfo}
        onClose={handleWalletInfoClose}
        anchorEl={walletInfoAnchorRef.current}
        sx={{
          width: 250,
          backgroundColor: 'header.walletPopoverBackground',
          borderRadius: 'header.walletPopoverBorderRadius',
          boxShadow: 'header.walletPopoverBoxShadow',
          padding: 2
        }}
      >
        <Typography variant="h5" color="text.primary" align="center">
          {connectedChain?.name} Network
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="caption" noWrap color="text.secondary">
            {account}
          </Typography>
          <IconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(account || '');
            }}
          >
            <Iconify icon="ion:copy-outline" sx={{ height: '12px', color: 'text.primary' }} />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            border: theme.palette.header.yellowBorder,
            borderRadius: '25px',
            padding: '12px',
            mt: 2
          }}
          direction="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Box component="img" src={providerInfo?.logo || ''} sx={{ height: '45px' }} />
          <Stack direction="column">
            <Typography variant="caption" noWrap color="text.secondary">
              {providerInfo?.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="h5" color="text.primary">
                {balance}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {connectedChain?.currencySymbol}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack>
          <List sx={{ color: 'text.secondary' }}>
            <Link href="#/tenK-collection" color="text.secondary">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Iconify icon="fa6-regular:image" />
                  </ListItemIcon>
                  <ListItemText primary="TenK Collections" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Iconify icon="icon-park-outline:setting-one" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem disablePadding onClick={handleDarkMode}>
              <ListItemButton>
                <ListItemIcon>
                  <Iconify icon="bx:moon" />
                </ListItemIcon>
                <ListItemText primary={`${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={handleDisconnectWallet}>
              <ListItemButton>
                <ListItemIcon>
                  <Iconify icon="bx:log-out" />
                </ListItemIcon>
                <ListItemText primary="Disconnect" />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </MenuPopover>
    </>
  );
};

export default React.memo(ConnectWalletPopover);
