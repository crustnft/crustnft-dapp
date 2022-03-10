import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  IconButton,
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
import Identicons from '@nimiq/identicons';
import Iconify from 'components/Iconify';
import useWeb3 from 'hooks/useWeb3';
import React, { useRef, useState } from 'react';
import MenuPopover from '../../components/MenuPopover';
import useLocales from '../../hooks/useLocales';
import useWallet from '../../hooks/useWallet';
Identicons.svgPath = './static/identicons.min.svg';

const ConnectWalletPopover = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const { translate } = useLocales();

  const { chain: selectedChain } = useWallet();

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

  return (
    <>
      {smUp && !walletIsConnected && (
        <Button
          color="info"
          variant="contained"
          onClick={handleWalletModalOpen}
          sx={{ backgroundColor: '#377dff' }}
          startIcon={
            <SvgIcon color="action">
              <Icon icon="fontisto:wallet" color="white" />
            </SvgIcon>
          }
        >
          {translate(`connectWallet.myWallet`)}
        </Button>
      )}

      {!smUp && !walletIsConnected && (
        <ButtonBase onClick={handleWalletModalOpen}>
          <SvgIcon>
            <Icon icon="fontisto:wallet" color="#377dff" />
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
                RIN
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack>
          <List sx={{ color: 'text.secondary' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Iconify icon="fa6-regular:image" />
                </ListItemIcon>
                <ListItemText primary="My Collections" />
              </ListItemButton>
            </ListItem>
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
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Iconify icon="bx:moon" />
                </ListItemIcon>
                <ListItemText primary="Dark Mode" />
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
