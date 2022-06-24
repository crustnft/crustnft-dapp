import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import { ArrowDownSquare } from 'assets/icons';
import Scrollbar from 'components/Scrollbar';
import useWallet from 'hooks/useWallet';
import useWeb3 from 'hooks/useWeb3';
import { useRef, useState } from 'react';
import MenuPopover from '../../components/MenuPopover';
import { SUPPORTED_CHAINS } from '../../constants/chains';
const ITEM_HEIGHT = 50;

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { chain: selectedChain } = useWallet();
  const { deactivate, switchNetwork } = useWeb3();
  return (
    <>
      <Box
        component={Button}
        ref={anchorRef}
        onClick={() => setOpen(true)}
        color="text.primary"
        size="small"
        marginTop={{ xs: 2, sm: 0 }}
        marginLeft={{ sm: 2 }}
        sx={[(theme) => theme.palette.customCSS.buttonHeader.common, { ml: '15px !important' }]}
        endIcon={<ArrowDownSquare />}
      >
        {selectedChain.name}
      </Box>
      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        <Typography variant="subtitle1" sx={{ p: 1.5 }}>
          Networks <Typography component="span">({SUPPORTED_CHAINS.length})</Typography>
        </Typography>
        <Scrollbar sx={{ height: ITEM_HEIGHT * 6, pb: 1 }}>
          {SUPPORTED_CHAINS.map((chain, index) => (
            <MenuItem
              key={chain.chainId}
              selected={chain.chainId === (selectedChain?.chainId || 1)}
              onClick={() => {
                switchNetwork(chain.chainId);
                setOpen(false);
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={chain.name} src={chain.icon} sx={{ height: '30px' }} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {chain.name}
              </ListItemText>
            </MenuItem>
          ))}
          <Stack alignItems="center" sx={{ mt: 2 }}>
            <Button variant="outlined" size="small" onClick={deactivate}>
              Reset Wallet
            </Button>
          </Stack>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
