import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import messagCircleOutline from '@iconify/icons-eva/message-circle-outline';
import externaLinkOutline from '@iconify/icons-eva/external-link-outline';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Avatar, Button, Box, Divider, MenuItem, Typography } from '@mui/material';
// components
import { MIconButton } from '../../components/@material-extend';
import MenuPopover from '../../components/MenuPopover';

import { shortenAddress } from '../../utils/formatAddress';

import Identicons from '@nimiq/identicons';
import { IRootState } from 'reduxStore';
Identicons.svgPath = './static/identicons.min.svg';
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const selectedAccountAddress = useSelector((state: IRootState) => {
    return state.reducerSelectAccount.accountAddress;
  });
  const selectedNetworkName = useSelector((state: IRootState) => {
    return state.reducerSelectAccount.networkName;
  });

  const [uniqueIcon, setUniqueIcon] = useState<string>('');
  useEffect(() => {
    Identicons.toDataUrl(
      selectedAccountAddress === '' ? 'Hello World' : selectedAccountAddress
    ).then((img: string) => {
      setUniqueIcon(img);
    });
  }, [selectedAccountAddress]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const infoToDisplay = () => {
    return (
      <>
        <Typography variant="subtitle1" noWrap>
          {shortenAddress(selectedAccountAddress, 5)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {selectedAccountAddress === '' ? 'Hello World' : selectedNetworkName}
        </Typography>
      </>
    );
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: 'transparent'
            }
          })
        }}
      >
        <Avatar alt="My Avatar" src={uniqueIcon} />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>{infoToDisplay()}</Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          key="Explorer"
          sx={{ typography: 'body2', py: 1, px: 2.5 }}
          onClick={() => {
            if (selectedNetworkName === 'Crust') {
              window.open('https://crust.subscan.io/', '_blank');
            }
            if (selectedNetworkName === 'Polygon') {
              window.open('https://polygonscan.com/', '_blank');
            }
            setOpen(false);
          }}
        >
          <Box
            component={Icon}
            icon={externaLinkOutline}
            sx={{
              mr: 2,
              width: 24,
              height: 24
            }}
          />
          Explorer
        </MenuItem>

        <MenuItem
          key="Support"
          to="#"
          component={RouterLink}
          onClick={handleClose}
          sx={{ typography: 'body2', py: 1, px: 2.5 }}
        >
          <Box
            component={Icon}
            icon={messagCircleOutline}
            sx={{
              mr: 2,
              width: 24,
              height: 24
            }}
          />
          Support
        </MenuItem>

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined">
            Disconnect
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
