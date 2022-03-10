import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Identicons from '@nimiq/identicons';
import Iconify from 'components/Iconify';
import { EMPTY_CHAIN, SUPPORTED_CHAINS } from 'constants/chains';
import useWeb3 from 'hooks/useWeb3';
import React, { useEffect, useRef, useState } from 'react';
import MenuPopover from '../../components/MenuPopover';
import useLocales from '../../hooks/useLocales';
import useSnackbarAction from '../../hooks/useSnackbarAction';
import useWallet from '../../hooks/useWallet';
import { Chain } from '../../interfaces/chain';
import { shortenAddress } from '../../utils/formatAddress';
Identicons.svgPath = './static/identicons.min.svg';

const ConnectWalletPopover = () => {
  const theme = useTheme();
  const onSnackbarAction = useSnackbarAction();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const { translate } = useLocales();

  const { chain: selectedChain, selectedWallet } = useWallet();

  const {
    active: walletIsConnected,
    activate,
    account,
    deactivate,
    connectedChainId,
    balance
  } = useWeb3();

  const [openWalletInfo, setOpenWalletInfo] = useState(false);
  const walletInfoAnchorRef = useRef(null);
  const [uniqueIcon, setUniqueIcon] = useState<string>('');
  const [network, setNetwork] = useState<Chain>(selectedChain);

  useEffect(() => {
    const found = SUPPORTED_CHAINS.find((chain) => chain.chainId === connectedChainId);
    if (found) {
      setNetwork(found);
    } else {
      setNetwork(EMPTY_CHAIN);
    }
  }, [connectedChainId]);

  useEffect(() => {
    if (selectedWallet) {
      activate();
    }
  }, [selectedWallet, activate]);

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

  useEffect(() => {
    if (account) {
      Identicons.toDataUrl(`${network.currencySymbol.toLowerCase()}:${account}`).then(
        (img: string) => {
          setUniqueIcon(img);
        }
      );
    }
  }, [account, network.currencySymbol]);

  const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      onSnackbarAction('success', translate('connectWallet.copiedAddress'), 3000);
    }
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
              RIN
            </Typography>
          </Stack>
        </ButtonBase>
      )}

      <MenuPopover
        open={openWalletInfo}
        onClose={handleWalletInfoClose}
        anchorEl={walletInfoAnchorRef.current}
        sx={{
          width: 220,
          backgroundColor: 'header.walletPopoverBackground',
          borderRadius: 'header.walletPopoverBorderRadius',
          boxShadow: 'header.walletPopoverBoxShadow',
          padding: 2
        }}
      >
        <Typography variant="h5" color="text.primary" align="center">
          Rinkeby Network
        </Typography>
        <Stack direction="row">
          <Typography variant="caption" noWrap sx={{ width: '100%' }}>
            0xFeCda4613CCf92a39d144cF1917A76326D55Fb29
          </Typography>
        </Stack>

        <Stack alignItems="center" sx={{ mt: 2 }} spacing={1}>
          <Box sx={{ backgroundColor: '#EAECEF', padding: 0.5, borderRadius: 0.5 }}>
            <Stack direction="row" spacing={0.5}>
              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle2">{`${(
                  network?.currencySymbol || ''
                ).toLowerCase()}:`}</Typography>
                <Typography variant="body2">{shortenAddress(account || '', 5)}</Typography>
              </Stack>
              <Stack direction="row">
                <IconButton
                  color="primary"
                  aria-label="copy"
                  component="span"
                  size="small"
                  onClick={handleCopyAddress}
                >
                  <Iconify icon={'akar-icons:copy'} />
                </IconButton>
                <Link href={network?.blockExplorerUrl + '/address/' + account} target="_blank">
                  <IconButton color="primary" aria-label="copy" component="span" size="small">
                    <Iconify icon={'bx:bx-link-external'} />
                  </IconButton>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ mx: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Wallet</Typography>
            <Typography variant="body2">{selectedWallet}</Typography>
          </Stack>
        </Box>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ mx: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Network</Typography>
            <Typography variant="body2">{network?.name}</Typography>
          </Stack>
        </Box>
        <Divider sx={{ mt: 1 }} />
        <Box sx={{ p: 2 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleDisconnectWallet}>
            {translate(`dashboard.disconnect`)}
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};

export default React.memo(ConnectWalletPopover);
